import {useEffect} from 'react'
import { ReactComponent as Icon } from '../assets/star_icon.svg';

const Event = ({ event, index }) => {
    const openInNewTab = url => {
        window.open(url, '_blank', 'noopener,noreferrer');
      };
    return (
            // eslint-disable-next-line react/style-prop-object
            <button className="card" onClick={() => openInNewTab(event.url)}>
                <div class="thumbnail">
                    <img src={event.images[9].url} alt="event_image"/>
                </div>
                <div>
                    <h2 class="text_shadow" title={event.name}>{event.name}</h2>
                    <p style={{color: '#959595'}}><strong>{event.dates.start.localDate}</strong></p> 
                </div>
                <button>
                    <div><Icon/></div>
                </button>
            </button>
    )
}
export default Event