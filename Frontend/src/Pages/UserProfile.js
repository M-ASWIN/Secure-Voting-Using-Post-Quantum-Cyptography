import React from "react";
import { NavLink } from "react-router-dom";
import "../Styles/UserProfile.css";
import homeIcon from "../assets/icons/home-icon-silhouette.png"


const UserProfile = () => {
    const user = JSON.parse(localStorage.getItem("user"));

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
                    <button className="start-logout-button" onClick={async () => { 
                        const userId = user.id;
                        if (userId) {
                            await fetch(`http://localhost:8080/auth/logout?userId=${userId}`, { 
                                method: "PUT" 
                            });
                        }
                        localStorage.clear(); 
                        window.location.href = "/";
                    }}>
                        Logout
                    </button>
                </li>
            </ul>
        </nav>
        <div className="welcome-text">
                <h1>
                    WELCOME, <span className="animated-text">{user.name.charAt(0).toUpperCase() + user.name.slice(1).toLowerCase()}</span>!
                </h1>
                <div className="welcome-description">
                    <p>
                    We are thrilled to have you here. Explore your profile, check the latest elections, or reach out to us if you have any questions. Let's make this journey amazing together!
                    </p>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
