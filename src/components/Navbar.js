import React from 'react';
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import axios from 'axios'
import {
  Nav,
  NavLink,
  Bars,
  NavMenu,
  NavBtn,
  NavBtnLink,
} from './NavbarElements';
  


const Navbar = () => {
    const { authed, logout } = useAuth();
    const navigate = useNavigate();


    const handleLogout = () => {
        axios({
            method: "GET",
            url:"/logout",
            baseURL:"http://localhost:5000"
          })
        logout();
        navigate("/");
    }

    return (
        <>
        <Nav justifyContent="space-between">
            <Bars />
            <NavMenu >
                
                    <NavLink to='/dashboard' activestyle="true">
                        Recommendations
                    </NavLink>
                    <NavLink to='/saved' activestyle="true">
                        Saved Concerts
                    </NavLink>

           
            {/* Second Nav */}
            {/* <NavBtnLink to='/sign-in'>Sign In</NavBtnLink> */}
            
            </NavMenu>
            <NavLink to='/'>
                <button marginLeft="auto" className="log-button" onClick={handleLogout}>
                    Logout
                </button>
            </NavLink>
            
        </Nav>
        </>
    );
};
  
export default Navbar;