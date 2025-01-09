import React from "react";
import { NavLink } from "react-router-dom";
import "../Styles/UserProfile.css";
import { useState, useEffect } from "react";
import axios from "axios";
import "../Styles/UsersList.css"
import homeIcon from "../assets/icons/home-icon-silhouette.png"
import { Link } from "react-router-dom";


const UserLists = () => {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios
          .get("http://localhost:8080/api/users")
          .then((response) => {
            setUsers(response.data);
          })
          .catch((error) => {
            console.error("Error fetching users:", error);
          });
      }, []);

    return (
          <div className="start-container-user">
          <nav className="navbar-user">
              <ul className="nav-linkes">
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
          
          <div className="users-page-container">
            <h1>User Details</h1>
            <div className="users-list">
                {users.length > 0 ? (
                users
                    .filter((user) => user.role !== 'ADMIN') 
                    .map((user) => (
                    <div key={user.id} className="user-card">
                        <h2>{user.name.charAt(0).toUpperCase() + user.name.slice(1).toLowerCase()}</h2>
                        <p><strong>Email:</strong> {user.email}</p>
                        <p><strong>Phone Number:</strong> {user.mobileNumber}</p>
                        <p><strong>Aadhar Number:</strong> {user.aadharNumber}</p>
                        <Link to={`/users/${user.id}`} className="view-details-button">
                        View full Details
                        </Link>
                    </div>
                    ))
                ) : (
                    <p>No users found</p>
                    )}
                </div>
            </div>
         </div>
         
    );
};


export default UserLists;
