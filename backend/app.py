import xdrlib
from xml.dom import xmlbuilder
from xml.sax import default_parser_list
import spotipy
from spotipy.oauth2 import SpotifyOAuth
from flask import Flask, url_for, session, request, redirect
import json
import time
import pandas as pd
import re
# from flask import CORS
from flask import Flask
from pymongo import MongoClient
from urllib.request import urlopen


# App config
app = Flask(__name__)
app
client = "client"
 
# Creating a database name GFG
db = client['mydb']
col = db['concerts']
rec = col.insert_one({"Faves": [""], "id":"hello"})

secret_key = 'key'
app.config['SECRET_KEY'] = secret_key
app.config['SESSION_COOKIE_NAME'] = 'spotify-login-session'
TOKEN_INFO ="token_info"

@app.before_request
def make_session_permanent():
    session.permanent = True

@app.route('/')
def login():
    sp_oauth = create_spotify_oauth()
    auth_url = sp_oauth.get_authorize_url()
    session.clear()
    print(auth_url)
    response_body = {
        "url": auth_url,
    }
    return response_body

@app.route('/authorize')
def authorize():
    sp_oauth = create_spotify_oauth()
    session.clear()
    code = request.args.get('code')
    token_info = sp_oauth.get_access_token(code)
    session["token_info"] = token_info
    return redirect("http://localhost:3000/dashboard")


@app.route('/loginStatus')
def loginStatus():
    session['token_info'], authorized = get_token()
    print(authorized)
    return redirect("http://localhost:3000/dashboard")

@app.route('/loginStatus2')
def loginStatus2():
    session['token_info'], authorized = get_token()
    print(authorized)
    return str(authorized)

@app.route('/logout')
def logout():
    for key in list(session.keys()):
        session.pop(key)
    return redirect('/')


@app.route('/getArtists')
def get_all_artists():
    session['token_info'], authorized = get_token()
    session.modified = True
    if not authorized:
        return redirect('/')
    sp = spotipy.Spotify(auth=session.get('token_info').get('access_token'))
    results = []
    iter = 0
    while True:
        offset = iter * 50
        iter += 1
        curGroup = sp.current_user_saved_tracks(limit=50, offset=offset)['items']
        for idx, item in enumerate(curGroup):
            track = item['track']
            val = track['artists'][0]['name']
            results += [val]
        if (len(curGroup) < 50):
            break

    return results

@app.route('/recommendConcerts')
def recommended_concerts():
    session['token_info'], authorized = get_token()
    session.modified = True
    if not authorized:
        print("NOT AUTHORIZED")
        return redirect('/')
   
    concert_dict = {}
    concert_list = []
    results = get_all_artists()
    string=""   
    counter = 0 

    for artist in results:
        if counter < 30:
            artist_name = string.join(artist)
            # print(artist_name)
            result = artist_name.replace(' ', '%20')
            # artist_key = artist_name.replace(' ', '_')
            concert_list.append(get_concert(get_events(result)))
            # concert_dict[artist_key] = get_concert(get_events(result))
            counter += 1
        else:
            break
    # concert_json = json.dumps(concert_dict)
    responseB = {
        "events": concert_list
    }
    # rec = col.insert_one(concert_dict)
    return responseB

def get_concert(data_json):
    concert_json = {}
    counter = 0

    for concert in data_json['events']:
        if counter < 1:
            concert_json.update(concert)
            counter += 1
        else:
            break
    
    return concert_json

def get_events(artist):
    url= 'https://app.ticketmaster.com/discovery/v2/events.json?classificationName=music&keyword='+artist+'&apikey=APIKEY'
    response = urlopen(url)
    data_json = json.loads(response.read())
    return data_json["_embedded"]
get_events("Adele")

@app.route("/getFavorites")
def get_favorites():
    concert_dict = {}
    fav_concert_item = col.find_one({"id":"hi"})
    fav_concert_list = fav_concert_item["Concerts"]
    fav_artist_list = fav_concert_item["Artists"]
    i = 0

    for concert in fav_concert_list:
        artist = fav_artist_list[i]
        the_concert = col.find_one({artist+".name":concert})
        concert_dict[artist] = the_concert[artist]
        i += 1

    concert_json = json.dumps(concert_dict)
    return concert_json

@app.route("/setFavorite")
def set_favorite(concert_name, artist_name):
    concert_exists = False
    fav_concert_item = col.find_one({"id":"hello"})
    fav_concert_list = fav_concert_item["Concerts"]
    fav_artist_list = fav_concert_item["Artists"]
    for concert in fav_concert_list:
        if concert == concert_name:
            fav_concert_list.remove(concert)
            concert_exists = True
    for artist in fav_artist_list:
        if artist == artist_name:
            fav_artist_list.remove(artist)
            concert_exists = True
    if not concert_exists:
        fav_concert_list.append(concert_name)
        fav_artist_list.append(artist_name)

    rec = col.update_one({"id":"hi"}, {"$set":{"Concerts":fav_concert_list, "Artists":fav_artist_list}})
    return fav_concert_list

# Checks to see if token is valid and gets a new token if not
def get_token():
    token_valid = False
    token_info = session.get("token_info", {})
    print(session)
    # Checking if the session already has a token stored
    if not (session.get('token_info', False)):
        token_valid = False
        return token_info, token_valid
    # Checking if token has expired
    now = int(time.time())
    is_token_expired = session.get('token_info').get('expires_at') - now < 60
    # Refreshing token if it has expired
    if (is_token_expired):
        sp_oauth = create_spotify_oauth()
        token_info = sp_oauth.refresh_access_token(session.get('token_info').get('refresh_token'))
    token_valid = True
    return token_info, token_valid


def create_spotify_oauth():
    return SpotifyOAuth(
        client_id="ID",
        client_secret="SECRET",
        redirect_uri=url_for('authorize', _external=True),
        # redirect_uri = "http://localhost:3000/login",
        scope="user-library-read"
    )


if __name__ == '__main__':
    app.run()