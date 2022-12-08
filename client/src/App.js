// import './App.css';
// import SearchBar from './Components/SearchBar.js';
// import BookData from "./Data.json";
//import { useEffect, useState } from 'react';

import {BrowserRouter, Routes, Route } from 'react-router-dom';

// pages
import Home from './pages/home/Home'
import Dashboard from './pages/dashboard/Dashboard'

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