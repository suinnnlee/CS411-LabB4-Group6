from pymongo import MongoClient
import json
from urllib.request import urlopen

client = MongoClient('mongodb+srv://jessicasu1023:Err6aroa@cluster0.ofrqirq.mongodb.net/test')
 
db = client['mydb']
col = db['testing12']
rec = col.insert_one({"Concerts": [], "Artists": [], "id":"hello"})



def get_favorites():
    concert_dict = {}
    fav_concert_item = col.find_one({"id":"hello"})
    fav_concert_list = fav_concert_item["Concert"]
    fav_artist_list = fav_concert_item["Artist"]
    i = 0

    for concert in fav_concert_list:
        artist = fav_artist_list[i]
        the_concert = col.find_one({artist+".name":concert})
        concert_dict[artist] = the_concert[artist]
        i += 1

    concert_json = json.dumps(concert_dict)
    return concert_json

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

    rec = col.update_one({"id":"hello"}, {"$set":{"Concerts":fav_concert_list, "Artists":fav_artist_list}})
    return fav_concert_list

def recommended_concerts():
    concert_dict = {}
    results = ["Adele", "Taylor%20Swift"]
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
get_events("Taylor%Swift")


# print(get_favorites())
print(get_favorites())
# cursor = col.find()
# for record in cursor:
#     print("HI")
#     print(record)
