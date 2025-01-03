import React, { useState } from 'react';
import '../Styles/RegisterPage.css';
import { validateUser } from '../Services/api';
import axios from 'axios';
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
            const response = await axios.post('http://localhost:8080/auth/validate-user' ,{aadharNumber : formData.aadharNumber});
            alert(response.data);

            if (response.data="valid") {
                setSuccess('Registration successful');
                setError('');
                console.log('User data submitted:', formData);

                // Send the registration data to the backend
                // await axios.post('/auth/register', formData);
            } else {
                setError('Mobile number or Aadhar number not found in the database');
                setSuccess('');
            }
        } catch (err) {
            console.error(err);
            setError('An error occurred while processing your registration');
            setSuccess('');
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
