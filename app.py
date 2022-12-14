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
from flask import Flask
from pymongo import MongoClient
from urllib.request import urlopen


# App config
app = Flask(__name__)
client = MongoClient('mongodb+srv://mchoe:ForSchool23%21@cs411b4g6.e9hxzy4.mongodb.net/test')
 
# Creating a database name GFG
db = client['mydb']
col = db['concerts']
rec = col.insert_one({"Faves": [""], "id":"hello"})

app.secret_key = 'app.secret_key'
app.config['SESSION_COOKIE_NAME'] = 'spotify-login-session'
TOKEN_INFO ="token_info"


@app.route('/')
def login():
    sp_oauth = create_spotify_oauth()
    auth_url = sp_oauth.get_authorize_url()
    print(auth_url)
    return redirect(auth_url)


@app.route('/authorize')
def authorize():
    sp_oauth = create_spotify_oauth()
    session.clear()
    code = request.args.get('code')
    token_info = sp_oauth.get_access_token(code)
    session["token_info"] = token_info
    return redirect("/recommendConcerts")


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
    # '''df = pd.DataFrame(results, columns=["song names"])
    # df.to_csv('songs.csv', index=False)'''
    # '''results=re.sub(r"\s+", '-', results)'''

    return results

@app.route('/recommendConcerts')
def recommended_concerts():
    concert_dict = {}
    results = get_all_artists()
    string=""
    counter = 0 

    for artist in results:
        if counter < 10:
            artist_name = string.join(artist)
            result = artist_name.replace(' ', '%20')
            artist_key = artist_name.replace(' ', '_')
            concert_dict[artist_key] = get_concert(get_events(result))
            counter += 1
        else:
            break

    concert_json = json.dumps(concert_dict)
    rec = col.insert_one(concert_dict)
    return concert_json

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
    url= 'https://app.ticketmaster.com/discovery/v2/events.json?classificationName=music&keyword='+artist+'&apikey=s2oO5t5X9U4lnJ5BMtzAGSAGWBSlU9zk'
    response = urlopen(url)
    data_json = json.loads(response.read())
    return data_json["_embedded"]
print(get_events("Adele"))

@app.route("/getFavorites")
def get_favorites():
    concert_dict = {}
    fav_artist_item = col.find_one({"id":"hello"})
    fav_artist_list = fav_artist_item["Faves"]
    for artist in fav_artist_list:
        concert = col.find_one({artist})
        concert_dict[artist] = concert

    concert_json = json.dumps(concert_dict)
    return concert_json


@app.route("/setFavorite")
def set_favorite(the_artist):
    artist_exists = False
    fav_artist_item = col.find_one({"id":"hello"})
    fav_artist_list = fav_artist_item["Faves"]
    for artist in fav_artist_list:
        if artist == the_artist:
            fav_artist_list.remove(the_artist)
            artist_exists = True
    if not artist_exists:
        fav_artist_list.append(the_artist)

    rec = col.update_one({"$set" : {"id":"hello", "Faves":fav_artist_list}})
    return fav_artist_list

# Checks to see if token is valid and gets a new token if not
def get_token():
    token_valid = False
    token_info = session.get("token_info", {})

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
        client_id="client_id",
        client_secret="client_secret",
        redirect_uri=url_for('authorize', _external=True),
        scope="user-library-read")


if __name__ == '__main__':
    app.run()
