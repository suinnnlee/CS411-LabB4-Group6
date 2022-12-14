import EventSaved from "./EventSaved"

const ListPageSaved = ({ concertData }) => {
    if(!concertData) return <main style={{textAlign: 'center', padding: '20px'}}>No Results</main>
    const events = concertData.events
    console.log(events)
    const results = events.map((event, index) => <EventSaved event={event} index={index}/>)

    return (
        <div>
            <div className="container">
                <div className="slider">
                    {results}
                </div>
            </div>
        </div>
    )
}
export default ListPageSaved