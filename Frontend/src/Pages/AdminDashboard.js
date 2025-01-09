import React from "react";
import { NavLink } from "react-router-dom";
import "../Styles/Admin.css";
import homeIcon from "../assets/icons/home-icon-silhouette.png"

const AdminDashboard = () => {
    const user = JSON.parse(localStorage.getItem("user"));

    return (
        <div className="start-container-user">
        <nav className="navbar-user">
            <ul className="nav-link">
                <li>
                   <div >
                        <a href="/admin-dashboard">
                        <img src={homeIcon} alt="home"></img>
                        </a>
                    </div>
                        
                </li>
                <li>
                    <NavLink 
                        to="/create-Elections" 
                        className={({ isActive }) => (isActive ? "active-link" : "")}>
                        Create Elections
                    </NavLink>
                </li>
                <li>
                    <NavLink 
                        to="/view-results" 
                        className={({ isActive }) => (isActive ? "active-link" : "")}>
                        Results
                    </NavLink>
                </li>
                <li>
                    <NavLink 
                        to="/users-list" 
                        className={({ isActive }) => (isActive ? "active-link" : "")}>
                        Users
                    </NavLink>
                </li>
                <li>
                    <NavLink 
                        to="/candidates-list" 
                        className={({ isActive }) => (isActive ? "active-link" : "")}>
                        Candidates
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
        <div className="welcome-txt">
                <h1>
                    WELCOME, <span className="animated-text">{user.name.charAt(0).toUpperCase() + user.name.slice(1).toLowerCase()}</span>!
                </h1>
                <div className="welcome-description">
                    <p>
                    Thank you for leading and managing the platform effectively. Here, you can monitor ongoing elections, manage user profiles, and ensure the smooth operation of all activities. Let's work together to make this platform a success!                    </p>
                </div>
            </div>
        </div>
    );
};


export default AdminDashboard;
