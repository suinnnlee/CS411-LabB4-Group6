// import './App.css';
// import SearchBar from './Components/SearchBar.js';
// import BookData from "./Data.json";
//import { useEffect, useState } from 'react';

import { getEvents } from './lib/api/axios'
import { useState, useEffect } from 'react'
import SearchBar from './components/form/SearchBar'
import ListPage from './components/ui/ListPage'

function App() {
  const [events, setEvents] = useState([])
  const [searchResults, setSearchResults] = useState([])

  useEffect(() => {
    setSearchResults(JSON.stringify(''))
    // getEvents('chicago').then(json => {
    //   setEvents(json)
    //   setSearchResults(json)
    // })
  }, [])


  return (
    <div class="background">
      <div>
        <SearchBar events={events} setSearchResults={setSearchResults} />
        <ListPage searchResults={searchResults} />
      </div>
    </div>
    
  )
}

export default App;