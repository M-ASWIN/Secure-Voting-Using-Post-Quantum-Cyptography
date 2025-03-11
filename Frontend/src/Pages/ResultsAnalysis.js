import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import "../Styles/ResultAnalysis.css"; // Import the styles

const ResultsAnalysis = () => {
  const { electionId } = useParams();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchResults();
  }, []);

  const fetchResults = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/vote/results/${electionId}`); // Fetch results for specific election
      setResults(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching election results:", error);
      setLoading(false);
    }
  };

  return (
    <div className="admin-container2">
      <h1 className="admin-title2">Election Results</h1>

      {loading ? (
        <p>Loading results...</p>
      ) : (
        <div>
          {/* Table for results */}
          <table className="results-table2">
            <thead>
              <tr>
                <th>Candidate</th>
                <th>Party</th>
                <th>Votes</th>
                <th>Percentage</th>
              </tr>
            </thead>
            <tbody>
              {results.map((candidate, index) => (
                <tr key={index}>
                  <td>{candidate.name}</td>
                  <td>{candidate.party}</td>
                  <td>{candidate.votes}</td>
                  <td>{candidate.percentage}%</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Bar Chart */}
          <div className="chart-container2">
            <h2>Vote Distribution</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={results}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="votes" fill="#007bff" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Refresh Button */}
          <button className="refresh-button2" onClick={fetchResults}>
            Refresh Results
          </button>
        </div>
      )}
    </div>
  );
};

export default ResultsAnalysis;
