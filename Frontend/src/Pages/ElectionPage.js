import React from "react";
import { NavLink } from "react-router-dom";
import "../Styles/UserProfile.css";

const ElectionPage = () => {

    return (
        <div className="start-container-user">
        <nav className="navbar-user">
            <ul className="nav-links">
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
        <div>hello</div>
        </div>
    );
};



export default ElectionPage;
