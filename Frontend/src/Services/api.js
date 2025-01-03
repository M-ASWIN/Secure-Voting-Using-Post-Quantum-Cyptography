import axios from 'axios';

const API_URL = 'http://localhost:8080'; // Adjust based on your backend URL

export const login = (username, password) =>
    axios.post(`${API_URL}/login`, { username, password });

export const register = (userData) =>
    axios.post(`${API_URL}/register`, userData);

export const getCandidates = () =>
    axios.get(`${API_URL}/candidates`);

export const submitVote = (voteData) =>
    axios.post(`${API_URL}/vote`, voteData);

export const getResults = () =>
    axios.get(`${API_URL}/results`);


export const validateUser = (aadharNumber) => {
    // Ensure aadharNumber is treated as a string
    const aadharNumberString = String(aadharNumber);
  
    return axios.post(`${API_URL}/auth/validate-user`, { aadharNumber: aadharNumberString });
  };