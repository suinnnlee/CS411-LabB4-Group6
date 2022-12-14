import {React} from 'react'
import axios from "axios";
import { useState, useEffect } from 'react'
import Navbar from '../../../components/Navbar'
import ListPageSaved from '../../../components/ListPageSaved'

const Saved = ({code}) => {
    const [concertData, setConcertData] = useState(null)

    useEffect(() => {
        
      axios({
        method: "GET",
        url:"/getFavorites",
        baseURL:"http://localhost:5000"
      })
      .then((response) => {
        setConcertData(response)
      }).catch((error) => {
        if (error.response) {
          console.log(error.response)
          console.log(error.response.status)
          console.log(error.response.headers)
          }
      })
    });
  
    return (
      <div className="background">
        <Navbar />        
        <div>
          <ListPageSaved concertData={concertData} />
        </div>
      </div>
      
    )
}

export default Saved