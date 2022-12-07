import { getEvents } from '../../lib/api/axios'
import {useEffect, useState} from 'react'

const SearchBar = ({events, setSearchResults }) => {
    const handleSubmit = (e) => e.preventDefault()
    const handleSearchChange = (e) => {
        if (!e.target.value) return setSearchResults

        getEvents(e.target.value).then(json => {
            setSearchResults(json)
        })
        
    }

    return (
        <div>
            <header>
                <h1>Search Events</h1>
                <form class="search" onSubmit={handleSubmit}>
                    <input
                        className="search_in"
                        placeholder="Search by City"
                        type="text"
                        id="search"
                        onChange={handleSearchChange}
                    />
                    {/* <button className="Search">
                        Search
                    </button> */}
                </form>
            </header>
        </div>
        
    )
}
export default SearchBar