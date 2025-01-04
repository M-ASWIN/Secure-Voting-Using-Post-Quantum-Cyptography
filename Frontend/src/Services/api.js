import axios from 'axios';

const API_URL = 'http://localhost:8080'; // Adjust based on your backend URL

export const login = async (email, password) => {
    try {
        const response = await axios.post('http://localhost:8080/auth/login', {
            email,
            password,
        });
        return response.data; // Assuming the response contains token and role
    } catch (error) {
        throw error.response ? error.response.data.message : 'Login failed';
    }
};

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