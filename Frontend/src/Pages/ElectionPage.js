import React, { useEffect, useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import "../Styles/UserProfile.css";
import homeIcon from "../assets/icons/home-icon-silhouette.png"


const ElectionPage = () => {
    
    const [elections, setElections] = useState([]);
    const user = JSON.parse(localStorage.getItem("user"));
    const userId= user.id;
    // useEffect(() => {
    //     axios.get("/api/elections/ongoing")
    //         .then(response => setElections(response.data))
    //         .catch(error => console.error("Error fetching elections", error));
    // }, []);

    useEffect(() => {
        fetchElections();
    }, []);

    const fetchElections = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/user-elections/available/${userId}`);
            setElections(response.data);
        } catch (error) {
            console.error("Error fetching elections:", error);
        }
    };

    const handleVote = async (electionId, candidateId) => {
        try {
            await axios.post(`http://localhost:8080/api/user-elections/vote`, null, {
                params: { userId, electionId, candidateId },
            });

            // Remove voted election from the list
            setElections(elections.filter(election => election.id !== electionId));
        } catch (error) {
            console.error("Error submitting vote:", error);
        }
    };


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
        <div>
            <h2>Available Elections</h2>
            {elections.length === 0 ? (
                <p>No elections available for voting.</p>
            ) : (
                elections.map((election) => (
                    <div key={election.id} className="election-card">
                        <h3>{election.name}</h3>
                        <ul>
                            {election.candidates.map((candidate) => (
                                <li key={candidate.id}>
                                    {candidate.name}
                                    <button onClick={() => handleVote(election.id, candidate.id)}>
                                        Vote
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))
            )}
        </div>
        </div>
    );
};



export default ElectionPage;
