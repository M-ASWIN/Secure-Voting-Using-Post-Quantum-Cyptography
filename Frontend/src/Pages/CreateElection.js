import React, { useEffect, useState } from "react";
import axios from "axios";
import "../Styles/CreateElection.css"; // Import the CSS file
import { NavLink } from "react-router-dom";
import homeIcon from "../assets/icons/home-icon-silhouette.png";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateElection = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const [election, setElection] = useState({
    name: "",
    startDate: "",
    endDate: "",
    candidateIds: [],
  });

  const [candidates, setCandidates] = useState([]);
  const [selectedCandidates, setSelectedCandidates] = useState([]);
  const [elections, setElections] = useState([]); // State to store elections

  // Fetch available candidates from the backend
  useEffect(() => {
    axios.get("http://localhost:8080/admin/candidates")
      .then(response => setCandidates(response.data))
      .catch(error => console.error("Error fetching candidates:", error));

    fetchElections(); // Fetch elections when the component loads
  }, []);

  // Fetch elections from backend
  const fetchElections = () => {
    axios.get("http://localhost:8080/api/elections")
      .then(response => setElections(response.data))
      .catch(error => console.error("Error fetching elections:", error));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setElection({ ...election, [name]: value });
  };

  const handleCandidateChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);
    setSelectedCandidates(selectedOptions);
  };

  const handleSubmit = async (e) => {

    const toastId = toast.loading("Creating election...", { position: "top-right" });

    e.preventDefault();

    const formattedElection = {
      ...election,
      candidateIds: selectedCandidates.map(Number),
    };

    try {
      const response = await axios.post("http://localhost:8080/api/elections", formattedElection, {
        headers: { "Content-Type": "application/json" },
      });
      toast.update(toastId, {
        render: "Election created successfully!",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });      
      toast.dismiss(toastId);

          fetchElections(); // Refresh election list
      setElection({ name: "", startDate: "", endDate: "", candidateIds: [] });
      setSelectedCandidates([]);
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      toast.dismiss(toastId);
      toast.update(toastId, {
        render: "Election creation unsuccessfull!",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });      }
  };

  // Delete election
  const handleDelete = async (id) => {
    const toastId = toast.loading("Deleting election...");

    try {
      await axios.delete(`http://localhost:8080/api/elections/${id}`);
      toast.update(toastId, {
        render: "Election deleted successfully!",
        type: "success",
        isLoading: false,
        autoClose: 3000,
    });      
    toast.dismiss(toastId);
    
    fetchElections();

    } catch (error) {
      console.error("Error deleting election:", error);
      toast.dismiss(toastId);
      toast.update(toastId, {
        render: "Failed to delete election!",
        type: "error",
        isLoading: false,
        autoClose: 2000,
    });    }
  };

  return (
    <div className="start-container-user">
      <nav className="navbar-user">
        <ul className="nav-nav-linkes">
          <li>
            <div>
              <a href="/admin-dashboard">
                <img src={homeIcon} alt="home" />
              </a>
            </div>
          </li>
          <li>
            <NavLink to="/create-Elections" className={({ isActive }) => (isActive ? "active-link" : "")}>
              Create Elections
            </NavLink>
          </li>
          <li>
            <NavLink to="/view-results" className={({ isActive }) => (isActive ? "active-link" : "")}>
              Results
            </NavLink>
          </li>
          <li>
            <NavLink to="/users-list" className={({ isActive }) => (isActive ? "active-link" : "")}>
              Users
            </NavLink>
          </li>
          <li>
            <NavLink to="/candidates-list" className={({ isActive }) => (isActive ? "active-link" : "")}>
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

      <div className="createcontainer">
        <h2>Create Election</h2>
        <form onSubmit={handleSubmit}>
          <label>Election Name:</label>
          <input type="text" name="name" value={election.name} onChange={handleChange} required />

          <label>Start Date:</label>
          <input type="datetime-local" name="startDate" value={election.startDate} onChange={handleChange} required />

          <label>End Date:</label>
          <input type="datetime-local" name="endDate" value={election.endDate} onChange={handleChange} required />

          <label>Select Candidates:</label>
          <select multiple onChange={handleCandidateChange}>
            {candidates.map((candidate) => (
              <option key={candidate.id} value={candidate.id}>
                {candidate.name} (ID: {candidate.id})
              </option>
            ))}
          </select>

          <button type="submit">Create Election</button>
        </form>
      </div>
      <ToastContainer /> 


      <div className="election-list">
        <h2>Election List</h2>
        {elections.length > 0 ? (
          <table className="election-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {elections.map((elec, index) => (
                <tr key={elec.id}>
                  <td>{index + 1}</td>
                  <td>{elec.name}</td>
                  <td>{elec.startDate}</td>
                  <td>{elec.endDate}</td>
                  <td>
                    <button className="delete-button" onClick={() => handleDelete(elec.id)}>Delete</button>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No elections available.</p>
        )}
                  <ToastContainer /> 

      </div>
    </div>
  );
};

export default CreateElection;
