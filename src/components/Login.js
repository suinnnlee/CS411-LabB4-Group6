import { redirect, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useLocation } from "react-router-dom";
import {useEffect } from 'react'
import axios from "axios"

const Login = () => {
//deprecated

//   const navigate = useNavigate();
//   const { authed, login } = useAuth();
//   const { state } = useLocation();

useEffect(() => {
    axios({
        method: "GET",
        url:"/authorize",
        baseURL:"http://localhost:5000"
      })
      .then((response) => {

      }).catch((error) => {
        console.log("LOGINERROR")
        // navigate("/")
    });
    axios({
        method: "GET",
        url:"/loginStatus2",
        baseURL:"http://localhost:5000"
      })
      .then((json) => {
        console.log("dashdata")
        console.log(json)
      })
      .catch((error) => {
      })
}, []);

  return (
    <div className="background">
        <h4 style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                margin: 'auto',
                height: '80%'
                }}
        >
            waiting for spotify...
        </h4>
      {/* <button onClick={handleLogin}>Log in</button> */}
    </div>
  );
};

export default Login