import React, { useState } from 'react';
import { login } from '../Services/api';
import '../Styles/LoginPage.css';
import loginImage from '../assets/login.png'; 
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const navigate = useNavigate(); 
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleLogin = async () => {
        try {
            const response = await login(username, password);
            setSuccess(response.message); // Show success message
            setError('');
            console.log('Logged in as:', response.username);
            // Optionally, navigate to another page
        } catch (err) {
            setError(err);
            setSuccess('');
        }
    };

    const handleForgotPassword = () => {
        navigate('/forgot-password');
        
    };

    const handleRegisterRedirect = () => {
        navigate("/register"); 
    };

    return (
        <div className="container">
            <div className="image-container">
                <img src={loginImage} alt="Login" className="image" />
            </div>
            <div className="form-container">
                <div className="form">
                    <h1 className="header">Login</h1>
                    <div className="text" >
                            Username
                        </div>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="input"
                    />
                    <div className="text">
                            Password
                        </div>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="input"
                    />
                    
                    {/* Forgot Password and Register Links */}
                    <div className="additional-actions">
                        <div className="forgot-password" onClick={handleForgotPassword}>
                            Forgot Password?
                        </div>
                        <p>Not a user? <span className="register-link" onClick={handleRegisterRedirect}>Register</span></p>
                    </div>

                    <button onClick={handleLogin} className="button">Login</button>
                    {success && <p className="success">{success}</p>}
                    {error && <p className="error">{error}</p>}
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
