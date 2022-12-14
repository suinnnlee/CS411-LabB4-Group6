import Event from "./Event"

const ListPage = ({ concertData }) => {
    if(!concertData) return <main style={{textAlign: 'center', padding: '20px'}}>No Results</main>
    const events = concertData.events
    const results = events.map((event, index) => <Event event={event} index={index}/>)

    return (
            <div className="container">
                <div className="slider">
                    {results}
                </div>
            </div>
    )
}
export default ListPage