import React from "react";
import { NavLink } from "react-router-dom";
import "../Styles/UserProfile.css";
import homeIcon from "../assets/icons/home-icon-silhouette.png"

const ViewResults = () => {
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
            </div>
          </div>
      );
  };
  


export default ViewResults;
