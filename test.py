from urllib.request import urlopen
from flask import Flask, jsonify, request
import requests
import json

def get_events(artist):
    search_url= 'https://app.ticketmaster.com/discovery/v2/events.json?classificationName=music&keyword='+artist+'&apikey=s2oO5t5X9U4lnJ5BMtzAGSAGWBSlU9zk'
    response = urlopen(search_url)
    data_json = json.loads(response.read())

    return data_json["_embedded"]

print(get_events("Adele"))