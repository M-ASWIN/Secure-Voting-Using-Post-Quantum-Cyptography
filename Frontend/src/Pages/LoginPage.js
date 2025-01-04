import React, { useState } from 'react';
import { login } from '../Services/api';
import axios from 'axios';
import '../Styles/LoginPage.css';
import loginImage from '../assets/login.png';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const LoginPage = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleLogin = async () => {
        try {
            const response = await axios.post(
                'http://localhost:8080/auth/login',
                { email, password },
                { withCredentials: true,

                 } // Include credentials (cookies)
            );
            localStorage.setItem('session_id', response.data.sessioncookie); // Set the role returned by the backend
            if (response.data.role === 'ADMIN') {
                navigate('/admin-dashboard');
            } else if (response.data.role === 'USER') {
                localStorage.setItem('userRole', response.data.role); // Set the role returned by the backend
                navigate('/user-profile');
            } else {
                navigate('/'); // Default redirect
        }
        } catch (err) {
            setError(err);
            setSuccess('');
        }
    };

    const handleForgotPassword = () => {
        navigate('/forgot-password');
    };

    const handleRegisterRedirect = () => {
        navigate('/register');
    };

    return (
        <div className="container">
            <div className="image-container">
                <img src={loginImage} alt="Login" className="image" />
            </div>
            <div className="form-container">
                <div className="form">
                    <h1 className="header">Login</h1>
                    <div className="text">Username</div>
                    <input
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="input"
                    />
                    <div className="text">Password</div>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="input"
                    />
                    <div className="additional-actions">
                        <div className="forgot-password" onClick={handleForgotPassword}>
                            Forgot Password?
                        </div>
                        <p>
                            Not a user?{' '}
                            <span className="register-link" onClick={handleRegisterRedirect}>
                                Register
                            </span>
                        </p>
                    </div>
                    <button onClick={handleLogin} className="button">
                        Login
                    </button>
                    {success && <p className="success">{success}</p>}
                    {error && <p className="error">{error}</p>}
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
