const SearchBar = () => ( 
    <div className="main">
      <h1>Concert Search</h1>
      <div className="search"></div>
    <form action="/" method="get">
        <label htmlFor="header-search">
            <span className="visually-hidden">Search for concerts by city </span>
        </label>
        <input
            type="text"
            id="header-search"
            placeholder="Input city"
            name="s" 
        />
        <button type="submit">Search</button> 
    </form>
    </div>

    
);

// const handleSubmit = async (e) => {
//   e.preventDefault();
//   await fetch('https://jsonplaceholder.typicode.com/posts', {
//       method: 'SUBMIT',
//       body: JSON.stringify({
//          title: title,
//          body: body,
//       }),
//       headers: {
//          'Content-type': 'application/json; charset=UTF-8',
//       },
//    })
//       .then((response) => response.json())
//       .then((data) => {
//          setPosts((posts) => [data, ...posts]);
//          setTitle('');
//          setBody('');
//       })
//       .catch((err) => {
//          console.log(err.message);
//       });
// };   


export default SearchBar;