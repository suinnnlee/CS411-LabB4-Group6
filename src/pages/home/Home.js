import React from 'react'
import axios from "axios"
import useAuth from "../../hooks/useAuth";

const Home = () => {
    //auth hook to track if we are logged in
    const { login } = useAuth();
    var errorMessage = "";
    const handleLogin = () => {
        //hook -> backend call and display login form
        login()
    }
    return (
        <div className="background">
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    margin: 'auto',
                    height: '80%'
                }}
            >
                <h1 className="home-header">Welcome to SpotifyConcerts</h1>
                <button className="log-button" onClick={handleLogin}>
                    Login
                </button>
                <h5 color='red'>{errorMessage}</h5>
            </div>
        </div>
    );
  };
    
  export default Home;