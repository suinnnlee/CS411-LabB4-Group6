import logo from './logo.svg';
import './App.css';
import SearchBar from './Components/SearchBar.js';
import { useEffect } from 'react';

function App() {
  // const [data, setdata] = useState({
  //   concert: "",
  //   URL: "",
  //   date: "",
  //   location: "",
  // });

  // // Using useEffect for single rendering
  // useEffect(() => {
  //     // Using fetch to fetch the api from 
  //     // flask server it will be redirected to proxy
  //     fetch("/data").then((res) =>
  //         res.json().then((data) => {
  //             // Setting a data from api
  //             setdata({
  //                 concert: data.Concert,
  //                 URL: data.URL,
  //                 date: data.Date,
  //                 location: data.location,
  //             });
  //         })
  //     );
  // }, []);

  return (
    <SearchBar />
    
  );
}

export default App;
