import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import "../Styles/CreateElection.css";
import "../Styles/UserProfile.css";
import homeIcon from "../assets/icons/home-icon-silhouette.png"

const CreateElection = () => {
    const [electionName, setElectionName] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [candidates, setCandidates] = useState([]);
    const [selectedCandidates, setSelectedCandidates] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8080/admin/candidates") // Fetch candidates
            .then((response) => setCandidates(response.data))
            .catch((error) => console.error("Error fetching candidates", error));
    }, []);

    const handleCreateElection = () => {
        const newElection = {
            name: electionName,
            startDate,
            endDate,
            candidates: selectedCandidates.map(id => ({ id })),
        };

        axios.post("http://localhost:8080/api/elections/create", newElection)
            .then((response) => {
                alert("Election Created Successfully!");
                setElectionName("");
                setStartDate("");
                setEndDate("");
                setSelectedCandidates([]);
            })
            .catch((error) => console.error("Error creating election", error));
    };

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
          <div className="containerCreate">
            <h2 className="headingCreate">Create Election</h2>
            
            <div className="form-groupCreate">
                <label className="labelCreate">Election Name:</label>
                <input 
                    type="text" 
                    className="input-fieldCreate"
                    value={electionName} 
                    onChange={(e) => setElectionName(e.target.value)} 
                />
            </div>

            <div className="form-groupCreate">
                <label className="labelCreate">Start Date:</label>
                <input 
                    type="date" 
                    className="input-fieldCreate"
                    value={startDate} 
                    onChange={(e) => setStartDate(e.target.value)} 
                />
            </div>

            <div className="form-groupCreate">
                <label className="labelCreate">End Date:</label>
                <input 
                    type="date" 
                    className="input-fieldCreate"
                    value={endDate} 
                    onChange={(e) => setEndDate(e.target.value)} 
                />
            </div>

            <h3 className="sub-headingCreate">Select Candidates</h3>
            
            <div className="candidate-list-2Create">
                {candidates.map(candidate => (
                    <div key={candidate.id} className="candidate-itemCreate">
                        <input 
                            type="checkbox" 
                            className="checkboxCreate"
                            value={candidate.id}
                            onChange={(e) => {
                                const isChecked = e.target.checked;
                                setSelectedCandidates(prev => 
                                    isChecked ? [...prev, candidate.id] : prev.filter(id => id !== candidate.id)
                                );
                            }}
                        />
                        <span className="candidate-infoCreate">{candidate.name} - {candidate.party}</span>
                    </div>
                ))}
            </div>

            <button className="buttonCreate" onClick={handleCreateElection}>Create Election</button>
            </div>

          </div>
      );
  };
  


export default CreateElection;
