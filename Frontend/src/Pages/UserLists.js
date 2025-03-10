import React from "react";
import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import "../Styles/UserProfile.css"
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
              <ul className="nav-nav-linkes">
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
            <h1 style={{ color:'#007bff'}}>User Details</h1>
            <div className="users-list">
                {users.length > 0 ? (
                users
                    .filter((user) => user.role !== 'ADMIN') 
                    .map((user) => (
                    <div key={user.id} className="user-card">
                        <h2>{user.name.charAt(0).toUpperCase() + user.name.slice(1).toLowerCase()}</h2>
                        <p><strong style={{ color:'#007bff'}}>Email:</strong> {user.email}</p>
                        <p><strong style={{ color:'#007bff'}}>Phone Number:</strong> {user.mobileNumber}</p>
                        <p><strong style={{ color:'#007bff'}}>Aadhar Number:</strong> {user.aadharNumber}</p>
                        <button className="view-details-button"><Link to={`/users/${user.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                        View full Details
                        </Link>
                        </button>
                        <button
                            className="view-button"
                            onClick={() => {
                            if (window.confirm(`Are you sure you want to delete ${user.name}?`)) {
                                // Handle delete user
                                axios
                                .delete(`http://localhost:8080/api/users/${user.id}`)
                                .then(() => {
                                    alert(`${user.name} deleted successfully.`);
                                    setUsers(users.filter((u) => u.id !== user.id));
                                })
                                .catch((error) => {
                                    console.error("Error deleting user:", error);
                                    alert("Failed to delete user.");
                                });
                            }
                            }}
                        >
                            Delete User
                        </button>
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
