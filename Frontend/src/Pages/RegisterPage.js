import React, { useState } from 'react';
import '../Styles/RegisterPage.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import registerImage from '../assets/Figure.png'; // Ensure this image exists in your assets folder

const RegisterPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        dob: '',
        fatherName: '',
        mobileNumber: '',
        email: '',
        aadharNumber: '',
        password: '',
        confirmPassword: ''
    });

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    
    const navigate = useNavigate(); // Initialize navigate function

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleRegister = async () => {
        try {
            // Example validation for passwords
            if (formData.password !== formData.confirmPassword) {
                setError('Passwords do not match');
                setSuccess('');
                return;
            }
            const phoneRegex = /^\d{10}$/;
            if (!phoneRegex.test(formData.mobileNumber)) {
                setError('Invalid phone number');
                setSuccess('');
                return;
            }
            const dob = new Date(formData.dob);
            const today = new Date();
            const age = today.getFullYear() - dob.getFullYear();
            const monthDifference = today.getMonth() - dob.getMonth();
            const dayDifference = today.getDate() - dob.getDate();

            if (
                age < 18 ||
                (age === 18 && monthDifference < 0) ||
                (age === 18 && monthDifference === 0 && dayDifference < 0)
            ) {
                setError('You must be at least 18 years old.');
                setSuccess('');
                return;
            }
            const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
            if (!emailRegex.test(formData.email)) {
                setError('Please enter a valid Gmail address.');
                setSuccess('');
                return;
            }

            const response = await axios.post('http://localhost:8080/auth/validate-user' ,{aadharNumber : formData.aadharNumber});
           
            if (response.data==="valid") {
                console.log('User data submitted:', formData);
                const response2 = axios.post('http://localhost:8080/auth/register-user', formData, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                if ((await response2).status===200) {
                    setSuccess('Registration successful');
                    setError('');
                    alert("Registration was successfull Go to login");
                    navigate("/");
                }
                else {
                    setError('Registration unsuccessful');
                    setSuccess('');
                }
            } else {
                setError('Aadhar number not found in the database hence you cant register');
                setSuccess('');
            }
        } catch (err) {
            if (err.response && err.response.status === 400) {
                // Handle 400 Bad Request
                console.log("test");
                setError('Aadhar number already found in the database hence you cannot register');
                setSuccess('');
            }
            else{
                console.error(err);
                setError('Aadhar number not found in the database hence you cannot register');
                setSuccess('');
            }
        }
    };

    return (
        <div className="reg-container">
            <div className="reg-image-container">
                <img src={registerImage} alt="Register" className="reg-image" />
            </div>
            <div className="form-container">
                <div className="form">
                    <h1 className="header">Register</h1>
                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={formData.name}
                        onChange={handleChange}
                        className="input"
                    />
                    <input
                        type="date"
                        name="dob"
                        placeholder="Date of Birth"
                        value={formData.dob}
                        onChange={handleChange}
                        className="input"
                    />
                    <input
                        type="text"
                        name="fatherName"
                        placeholder="Father's Name"
                        value={formData.fatherName}
                        onChange={handleChange}
                        className="input"
                    />
                    <input
                        type="text"
                        name="mobileNumber"
                        placeholder="Mobile Number"
                        value={formData.mobileNumber}
                        onChange={handleChange}
                        className="input"
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        className="input"
                    />
                    <input
                        type="text"
                        name="aadharNumber"
                        placeholder="Aadhar Number"
                        value={formData.aadharNumber}
                        onChange={handleChange}
                        className="input"
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        className="input"
                    />
                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Re-enter Password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className="input"
                    />
                    <button onClick={handleRegister} className="reg-button">Register</button>
                    {success && <p className="success">{success}</p>}
                    {error && <p className="error">{error}</p>}
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
