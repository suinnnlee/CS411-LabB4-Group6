from django.shortcuts import render
import requests as req

api_keys='OtkvG6viu5AsLPGGjQ1fSQR4tuqNYWNZ'
def artist_search(request):
    return render(request,'concert/artist_search.html')

def concert_list(request):
    print("REQUEST:", request.POST['artist'])
    aritist = request. POST['artist']
    ticket_master_url = generate_ticket_master_url(artist)
    response = req.get(ticket_master_url)
    print("RESPONSE:",response.json())
    #return render(request, 'concert/artist_concert.html',)
    pass
def generate_ticket_master_url(artist):
    modified_aritist = artist.replace('',"+")
    url= 'https://app.ticketmaster.com/discovery/v2/events.json?keyword='+ modified_aritist + api_keys
    return url

#https://app.ticketmaster.com/discovery/v2/events.json?keyword=lady+gaga&apikey=OtkvG6viu5AsLPGGjQ1fSQR4tuqNYWNZ