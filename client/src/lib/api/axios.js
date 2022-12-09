import axios from "axios"

export const api = axios.create({
    baseURL: 'https://app.ticketmaster.com/discovery/v2/events.json?size=3'
})

export const getEvents = async (city) => {
    // const apikey = insert apikey, comment next line
    const apikey = '&apikey=s2oO5t5X9U4lnJ5BMtzAGSAGWBSlU9zk'
    const params = new URLSearchParams([['city', city]]);
    const response = await api.get('https://app.ticketmaster.com/discovery/v2/events.json?size=20&sort=onSaleStartDate,asc&apikey=s2oO5t5X9U4lnJ5BMtzAGSAGWBSlU9zk&city='+city)
    return response.data
}
