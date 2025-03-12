import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import "../Styles/UserProfile.css";
import "../Styles/ElectionPage.css";
import homeIcon from "../assets/icons/home-icon-silhouette.png";

const ElectionPage = () => {
    
    const [elections, setElections] = useState([]);
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user.id;

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

    const handleVote = (electionId) => {
        navigate(`/vote/${electionId}`);
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
            <div className="elections-container">
                <h2>Available Elections</h2>
                {elections.length === 0 ? (
                    <p>No elections available for voting.</p>
                ) : (
                    <div className="elections-grid">
                        {elections.map((election) => (
                            <div key={election.id} className="election-card">
                                <h3>{election.name}</h3>
                                <button className="vote-button" onClick={() => handleVote(election.id)}>
                                    Vote
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ElectionPage;
