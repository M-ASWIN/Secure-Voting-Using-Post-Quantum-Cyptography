import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../Styles/ViewResults.css"; // Import CSS
import { NavLink } from "react-router-dom";
import homeIcon from "../assets/icons/home-icon-silhouette.png"

const ViewResults = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const [elections, setElections] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchElections();
  }, []);

  const fetchElections = async () => {
    try {
     axios.get("http://localhost:8080/api/elections")
      .then(response => setElections(response.data))
    } catch (error) {
      console.error("Error fetching elections:", error);
    }
  };

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
    <div className="view-results-container">
      <h1 className="view-results-title">Election Results</h1>
      <div className="election-list">
        {elections.map((election) => (
          <div key={election.id} className="election-card">
            <h2>{election.name}</h2>
            <button
              className="view-results-button"
              onClick={() => navigate(`/analyze/${election.id}`)}
            >
              View Result
            </button>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default ViewResults;
