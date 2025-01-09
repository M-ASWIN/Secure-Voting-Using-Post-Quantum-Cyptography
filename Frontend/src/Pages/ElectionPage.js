import React from "react";
import { NavLink } from "react-router-dom";
import "../Styles/UserProfile.css";
import homeIcon from "../assets/icons/home-icon-silhouette.png"


const ElectionPage = () => {

    return (
        <div className="start-container-user">
        <nav className="navbar-user">
            <ul className="nav-links">
                 <li>
                    <div >
                        <a href="/user-profile">
                        <img src={homeIcon} alt="home"></img>
                        </a>
                    </div>
                </li>
                <li>
                    <NavLink 
                        to="/personal-profile" 
                        className={({ isActive }) => (isActive ? "active-link" : "")}>
                        Personal Info
                    </NavLink>
                </li>
                <li>
                    <NavLink 
                        to="/current-elections" 
                        className={({ isActive }) => (isActive ? "active-link" : "")}>
                        Elections
                    </NavLink>
                </li>
                <li>
                    <NavLink 
                        to="/contact-us" 
                        className={({ isActive }) => (isActive ? "active-link" : "")}>
                        Contact Us
                    </NavLink>
                </li>
                <li>
                    <button className="start-logout-button" onClick={() => { 
                        localStorage.clear(); 
                        window.location.href = "/";
                    }}>
                        Logout
                    </button>
                </li>
            </ul>
        </nav>
        <div>Elections</div>
        </div>
    );
};



export default ElectionPage;
