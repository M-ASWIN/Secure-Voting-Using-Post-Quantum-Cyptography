import React, { useEffect, useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import "../Styles/UserProfile.css";
import homeIcon from "../assets/icons/home-icon-silhouette.png"


const ElectionPage = () => {
    
    const [elections, setElections] = useState([]);

    useEffect(() => {
        axios.get("/api/elections/ongoing")
            .then(response => setElections(response.data))
            .catch(error => console.error("Error fetching elections", error));
    }, []);

    useEffect(() => {
        fetchElections();
    }, []);

    const fetchElections = async () => {
        try {
            const response = await axios.get(`/api/user-elections/available?userId=${userId}`);
            setElections(response.data);
        } catch (error) {
            console.error("Error fetching elections:", error);
        }
    };

    const handleVote = async (electionId, candidateId) => {
        try {
            await axios.post(`/api/elections/vote`, null, {
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
            <h2>Ongoing Elections</h2>
            {elections.length > 0 ? (
                <table>
                    <thead>
                        <tr>
                            <th>Election Name</th>
                            <th>Start Date</th>
                            <th>End Date</th>
                            <th>Candidates</th>
                            <th>Vote</th>
                        </tr>
                    </thead>
                    <tbody>
                        {elections.map((election) => (
                            <tr key={election.id}>
                                <td>{election.name}</td>
                                <td>{election.startDate}</td>
                                <td>{election.endDate}</td>
                                <td>
                                    {election.candidates.map(candidate => (
                                        <div key={candidate.id}>{candidate.name} ({candidate.party})</div>
                                    ))}
                                </td>
                                <td>
                                    <button onClick={() => alert("Voting Feature Coming Soon!")}>Vote</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No ongoing elections available.</p>
            )}
        </div>
        </div>
    );
};



export default ElectionPage;
