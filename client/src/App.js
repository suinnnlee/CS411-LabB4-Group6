// import './App.css';
// import SearchBar from './Components/SearchBar.js';
// import BookData from "./Data.json";
//import { useEffect, useState } from 'react';

import axios from 'axios'
import {BrowserRouter, Routes, Route } from 'react-router-dom';

// pages
import Home from './pages/home/Home'
import Dashboard from './pages/dashboard/Dashboard'

const checkLoginStatus = () => {
  axios
    .get("http://localhost:3000/loggedIn", {withCredentials: true})
    .then(response => {
      console.log("logged in?", response);
    })
    .catch(error => {
      console.log("check login error", error);
    })
}

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path={"/"} exact element={<Home/>} />
          <Route path={"/dashboard"} exact element={<Dashboard/>} />
        </Routes>     
      </BrowserRouter>
    </div>
  );
}

export default App;