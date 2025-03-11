import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../Styles/VotePage.css";

const VotePage = () => {
    const { electionId } = useParams();
    const [election, setElection] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user?.id;

    useEffect(() => {
        fetchElection();
    }, []);

    const fetchElection = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/elections/${electionId}`);
            setElection(response.data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching election details:", error);
            setLoading(false);
        }
    };

    const handleVote = async (candidateId) => {
        try {
            await axios.post(`http://localhost:8080/api/user-elections/vote`, null, {
                params: { userId, electionId, candidateId },
            });

            // Redirect back to the dashboard after voting
            navigate("/current-elections");
        } catch (error) {
            console.error("Error submitting vote:", error);
        }
    };

    if (loading) {
        return <div className="vote-container">Loading...</div>;
    }

    return (
        <div className="vote-containers">
            <h1>{election?.name} Election</h1>
            <h2>Select a candidate to vote:</h2>
            <div className="candidates-list">
                {election?.candidates.map((candidate) => (
                    <div key={candidate.id} className="candidate-card">
                        <h3><p>Candidate Name:</p>{candidate.name}</h3>
                        <h3><p>Party:</p></h3>
                        <h4>{candidate.party}</h4>
                        <button className="vote-button" onClick={() => handleVote(candidate.id)}>Vote</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default VotePage;
