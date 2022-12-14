import {React} from 'react'
import { useState, useEffect } from 'react'
import Navbar from '../../components/Navbar'
import ListPage from '../../components/ListPage'
import axios from 'axios'

const Dashboard = ({code}) => {
    const [concertData, setConcertData] = useState(null)

    useEffect(() => {
          
        axios({
          method: "GET",
          url:"/recommendConcerts",
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
          <ListPage concertData={concertData} />
        </div>
      </div>
      
    )
}

export default Dashboard