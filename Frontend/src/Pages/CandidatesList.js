import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "../Styles/UsersList.css";
import homeIcon from "../assets/icons/home-icon-silhouette.png"
import "../Styles/CreateCandidates.css";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CandidatesList = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const [candidates, setCandidates] = useState([]);
    const [formData, setFormData] = useState({
        name: "",
        party: "",
        manifesto: "",
    });

    // Fetch existing candidates from backend
    useEffect(() => {
        fetchCandidates();
    }, []);

    const fetchCandidates = async () => {
        try {
            const response = await axios.get("http://localhost:8080/admin/candidates");
            setCandidates(response.data);
        } catch (error) {
            console.error("Error fetching candidates:", error);
        }
    };

    // Handle input changes
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        const toastId = toast.loading("Creating election...", { position: "top-right" });
        
        e.preventDefault();
        try {
            await axios.post("http://localhost:8080/admin/candidates", formData);
             toast.update(toastId, {
                    render: "Candidate added successfully!",
                    type: "success",
                    isLoading: false,
                    autoClose: 1000,
                  });      
            fetchCandidates(); // Refresh candidate list after adding
            setFormData({ name: "", party: "", manifesto: "" }); // Reset form
        } catch (error) {
            console.error("Error adding candidate:", error);
        }
    };
    
    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this candidate?")) {
          try {
            await axios.delete(`http://localhost:8080/admin/candidates/${id}`);
            setCandidates(candidates.filter((candidate) => candidate.id !== id));
            alert("Candidate deleted successfully!");
          } catch (error) {
            console.error("Error deleting candidate:", error);
            alert("Failed to delete candidate as he may be participating in a election.");
          }
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

          <div className="admin-container">
            <div className="inner-container">
            <h2>Manage Candidates</h2>

            {/* Candidate Creation Form */}
            <form onSubmit={handleSubmit} className="candidate-form">
                <label>Name:</label>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />

                <label>Party:</label>
                <input
                    type="text"
                    name="party"
                    value={formData.party}
                    onChange={handleChange}
                    required
                />

                <button type="submit">Add Candidate</button>
            </form>
            </div>
            <ToastContainer/>
                    {/* Display Candidate List as a Table */}
            <div className="candidate-list">
                <h3>Existing Candidates</h3>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Party</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {candidates.map((candidate) => (
                            <tr key={candidate.id}>
                                <td>{candidate.id}</td>
                                <td>{candidate.name}</td>
                                <td>{candidate.party}</td>
                                <td>
                                <button
                                    className="delete-button"
                                    onClick={() => handleDelete(candidate.id)}
                                >
                                    Delete
                                </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            </div>
          </div>
      );
  };
  


export default CandidatesList;
