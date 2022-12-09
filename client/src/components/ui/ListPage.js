import Event from "../Event"
import Carousel from "./Carousel"

const ListPage = ({ searchResults }) => {
    if(!searchResults._embedded) return <main style={{textAlign: 'center', padding: '20px'}}>No Results</main>

    const events = searchResults._embedded.events
    const results = events.map((event, index) => <Event event={event} index={index}/>)

    return (
        <Carousel name={"events"} content={results}/>
    )
}
export default ListPage