import React, { useState } from 'react';
import axios from 'axios';
import '../Styles/LoginPage.css';
import loginImage from '../assets/login.png';
import { useNavigate } from 'react-router-dom';
import { MlKem512 } from "https://esm.sh/mlkem";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginPage = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    
    function uint8ArrayToBase64(uint8Array) {
        return btoa(String.fromCharCode(...uint8Array));
    }

    const toHex = (buffer) => Array.from(buffer)
    .map(byte => byte.toString(16).padStart(2, '0'))
    .join('');


    function base64ToUint8Array(base64String) {
        let binaryString = atob(base64String);
        let uint8Array = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
            uint8Array[i] = binaryString.charCodeAt(i);
        }
        return uint8Array;
    }

    const handleLogin = async () => {

        try {
            const recipient = new MlKem512();
            const [pkAlice, skAlice] = await recipient.generateKeyPair();
            console.log(pkAlice);
            console.log(skAlice);

            const publicKeyBase64 = uint8ArrayToBase64(pkAlice);
            const response = await axios.post(
                'http://localhost:8080/auth/login',
                { email, password , publicKeyBase64 },
                { withCredentials: true,

                 } // Include credentials (cookies)
            );
            const cipherText = base64ToUint8Array(response.data.cipherText);
            const aliceKey = await recipient.decap(cipherText, skAlice);
            console.log(aliceKey);
            localStorage.setItem("sharedSecret", uint8ArrayToBase64(aliceKey));
            console.log(response);
            localStorage.setItem("user", JSON.stringify(response.data.user));
            localStorage.setItem('session_id', response.data.sessioncookie); // Set the role returned by the backend
            const toastId = toast.loading("Logining in ...", { position: "top-right" });

            setTimeout(() => {
                if (response.data.role === 'ADMIN') {
                    localStorage.setItem('userRole', response.data.role);
                    
                    // ✅ Update toast to success before navigating
                    toast.update(toastId, {
                        render: "Login Successful! Redirecting...",
                        type: "success",
                        isLoading: false,
                        autoClose: 1000
                    });
    
                    // ✅ Delay navigation until after the toast
                    setTimeout(() => navigate('/admin-dashboard'), 1000);
    
                } else if (response.data.role === 'USER') {
                    localStorage.setItem('userRole', response.data.role);
                    
                    toast.update(toastId, {
                        render: "Login Successful! Redirecting...",
                        type: "success",
                        isLoading: false,
                        autoClose: 1000
                    });
    
                    setTimeout(() => navigate('/user-profile'), 1000);
    
                } else {
                    toast.update(toastId, {
                        render: "Login Unsuccessful!",
                        type: "error",
                        isLoading: false,
                        autoClose: 1000
                    });
                }
            }, 1000);
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
                <ToastContainer />

            </div>
        </div>
        
    );
};

export default LoginPage;
