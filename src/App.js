import './App.css';
import {BrowserRouter, Routes, Route, NavLink} from 'react-router-dom'
import RequireAuth from './components/RequireAuth'
// import {SpotifyProvider} from './context/SpotifyContext'
// import {useEffect, useState} from 'react';

//pages
import Home from './pages/home/Home'
import Dashboard from './pages/dashboard/Dashboard'
import DashboardSaved from './pages/dashboard/saved/Saved'

// import Login from './components/Login'

function App() {
  return (

    <div className="ReactApp">
      <BrowserRouter>
        <Routes>
          <Route path={"/"} exact element={<Home/>} />
          <Route 
            path={"/dashboard"} 
            exact element={
              <RequireAuth>
                <Dashboard/>
              </RequireAuth>
            } 
          />
          <Route 
            path={"/saved"} 
            exact element={
              <RequireAuth>
                <DashboardSaved/>
              </RequireAuth>
            } 
          />
          {/* <Route path={"/login"} exact element={<Login/>} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );

}
export default App;


  // const CLIENT_ID = "key"
  // const REDIRECT_URI = "http://localhost:3000"
  // const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
  // const RESPONSE_TYPE = "token"
  
  // const [token, setToken] = useState("")
  
  // useEffect(() => {
  //   const hash = window.location.hash
  //   let token = window.localStorage.getItem("token")
  
  //   if (!token && hash) {
  //       token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]
  
  //       window.location.hash = ""
  //       window.localStorage.setItem("token", token)
  //   }
  
  //   setToken(token)
  //   console.log(token)
  
  // }, [])
  
  // const logout = () => {
  //   setToken("")
  //   window.localStorage.removeItem("token")
  // }
  
  // // console.log(code)
  //   <div className="App">
  //   <header className="App-header">
  //       <h1>Spotify React</h1>
  //       {!token ?
  //           <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}>Login
  //               to Spotify</a>
  //           : <button onClick={logout}>Logout</button>}
  //   </header>
  //   </div>
  