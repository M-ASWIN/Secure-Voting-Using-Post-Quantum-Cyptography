import React, { useState } from 'react';
import axios from 'axios';
import '../Styles/LoginPage.css';
import loginImage from '../assets/login.png';
import { useNavigate } from 'react-router-dom';

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
            console.log(response);
            localStorage.setItem("user", JSON.stringify(response.data.user));
            localStorage.setItem('session_id', response.data.sessioncookie); // Set the role returned by the backend
            if (response.data.role === 'ADMIN') {
                localStorage.setItem('userRole', response.data.role); 
                navigate('/admin-dashboard');
            } else if (response.data.role === 'USER') {
                localStorage.setItem('userRole', response.data.role); // Set the role returned by the backend
                navigate('/user-profile');
            } else {
                navigate('/'); // Default redirect
        }
        } catch (error) {
            const err=JSON.stringify(error);
            const err2=JSON.parse(err);
            if(err2.status===401){
            setError("Invalid credentials");
            }
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
