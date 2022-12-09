import React from 'react'
import { getEvents } from '../../lib/api/axios'
import { useState, useEffect } from 'react'
import SearchBar from '../../components/form/SearchBar'
import ListPage from '../../components/ui/ListPage'

function Dashboard() {
    const [events, setEvents] = useState([])
    const [searchResults, setSearchResults] = useState([])
  
    useEffect(() => {
    //   setSearchResults()
      getEvents('chicago').then(json => {
        setEvents(json)
        setSearchResults(json)
      })
    }, [])
  
  
    return (
      <div class="background">
        <div>
          {/* <SearchBar events={events} setSearchResults={setSearchResults} /> */}
          <ListPage searchResults={searchResults} />
        </div>
      </div>
      
    )
}

export default Dashboard