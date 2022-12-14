import {useEffect, useState} from 'react'
import concertFavs from '../pages/dashboard/concertFavs'
import axios from 'axios'
const Event = ({ event, index}) => { 
    const [date, setDate] = useState("")
    const openInNewTab = url => {
        window.open(url, '_blank', 'noopener,noreferrer');
      };
      useEffect(() => {
        const [year, month, day] = (event.dates.start.localDate).split("-");
        setDate((month+'/'+day+'/'+year))
    }, [])
    
    const handleRemove = () => {
        axios({
            method: "POST",
            url:"/setFavorites",
            baseURL:"http://localhost:5000",
            concert_name: event.concert_name,
            artist_name: event.name
          }).catch((error) => {
            console.log("SAVEERROR")
        }); 
    }

    return (
        // eslint-disable-next-line react/style-prop-object
        <button className="card">
            <div onClick={() => openInNewTab(event.url)}></div>
            <div class="thumbnail" onClick={() => openInNewTab(event.url)}>
                <img src={event.images[9].url} alt="event_image"/>
            </div>

            <div className="CardInfo">
                <div className="CardText" onClick={() => openInNewTab(event.url)} >
                    <h2 class="text_shadow" title={event.name}>{event.name} </h2>
                    <p style={{color: '#959595'}}><strong>{date}</strong></p>
                </div>
                <div className="SaveIcon" >
                        <button className="log-button" scale=".5"onClick={handleRemove}>Remove</button>
                </div>
            </div>
        </button>
    )
   
}
export default Event