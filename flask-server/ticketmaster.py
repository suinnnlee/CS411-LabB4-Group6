from flask import Flask, jsonify, request
import requests
import json

app = Flask(__name__)

apikey = 's2oO5t5X9U4lnJ5BMtzAGSAGWBSlU9zk' #hide on repo
search_url = "https://app.ticketmaster.com/discovery/v2/events.json"


@app.route("/")
def hello():
    return jsonify({"about": "Hello World!"})


@app.route("/get_events", methods=['GET', 'POST'])
def events():
    if request.method == 'POST':
        # store the file that is passed in with the POST request
        file = request.files['file']
        data = json.load(file)
    else:  # For debugging, if script.py didnt make a POST request, just manually load the file
        with open('request.json') as f:
            data = json.load(f)

    # Payload that will be sent to the ticketmaster API
    payload = {"size": data['size'], "city": data['city'], "apikey": apikey}
    # Make a request to the ticketmaster api given the URL and the parameters
    search = requests.get(search_url, params=payload)

    # Turn response into json
    search_json = search.json()

    search_json_filtered = {
        "name": search_json['_embedded']['events'][0]['name'],
        "url": search_json['_embedded']['events'][0]['url']
    }

    return jsonify(json.dumps(search_json_filtered, indent = 4))


if __name__ == '__main__':
    app.run(debug=True) #set to false on production