import React from 'react';
import '../Styles/StartPage.css'; // Link to your CSS file
import startImage from '../assets/TopMain.png'; // Replace with your image path
import { useNavigate } from 'react-router-dom';
import StepsImg from '../assets/Steps.png'; 
import AboutImg from '../assets/About.png'; 
import SendIcon from '../assets/icons/send.png'
import FacebookIcon from '../assets/icons/social.png'
import InstaIcon from '../assets/icons/instagram.png'
import TwitterIcon from '../assets/icons/twitter.png'
import DesktopImg from '../assets/Desktop.png';

const StartPage = () => {
    const navigate = useNavigate(); 
    const handleregisterpage = () => {
        navigate('/register');
    };
    const handleloginpage = () => {
        navigate('/login');
    };
    // const handlefeaturepage = () => {
    //     navigate('/features'); 
    // };
  

    return (
        <div className="start-container">
            <nav className="navbar">
                <ul className="nav-items">
                    <li><a href="#about"><button className="start-button">About</button></a></li>
                    <li><a href="#footer"><button className="start-button" >Contact</button></a></li>
                    <li><button className="start-login-button" onClick={handleloginpage}>Login</button></li>
                </ul>
            </nav>

            <div className="start-content-container">
                <div className="start-image-container">
                    <img src={startImage} alt="Start" className="start-image" />
                </div>
                <div className="start-text-container">
                    <h1 className="start-header">Be a part of decision</h1>
                    <p className="start-description">Vote today</p>
                    <button className="start-more-button" onClick={handleregisterpage}>Register</button>
                    <a href="#features"><button className="Login-button">Learn More</button></a>
                </div>
            </div>

            {/* Steps Section */}
            <div className="steps-section" id="steps">
                <ol className="steps-list">
                  <img src={StepsImg} alt="Full Page" className="steps-img" />
                </ol>
            </div>

            <div className="about-section" id="about" >
                <ol className="steps-list">
                <img src={AboutImg} alt="Full Page" className="features-img" />
                </ol>
            </div>

            <div className="features-section" id="features" >
                <ol className="steps-list">
                <img src={DesktopImg} alt="Full Page" className="features-img" />
                </ol>
            </div>
            

            <footer className="footer" id="footer">
                <div className="footer-container">
                
                    <div className="footer-section contact-info">
                        <p className="title">Contact us:</p>
                        <p className="content">8888 8888 88</p>
                        <p className="title">Email:</p>
                        <p className="content">securevote@example.com</p>
                        
                    </div>

                    <div className="footer-divider"></div>

              
                    <div className="footer-section additional-info">
                    <div className="navbar2">
                        <div className="section">
                            <h4>GetIn</h4>
                            <a href="/login">Login</a>
                            <a href="/register">Register</a>
                        </div>

                        <div className="section">
                            <h4>Know More</h4>
                            <a href="#features">Features</a>
                            <a href="#about">About</a>
                            <a href="#steps">Steps</a>
                        </div>
                    </div>

                        <div className="section">
                            <h4>Follow Us</h4>
                        
                            <div className="social-icons">
                                <img src={FacebookIcon} alt="Start" className="social-image" />
                                <img src={InstaIcon} alt="Start" className="social-image" />
                                <img src={TwitterIcon} alt="Start" className="social-image" />
                            </div>
                           
                        </div>
                    </div>

           
                    <div className="footer-divider"></div>

                 
                    <div className="footer-section feedback-form">
                        <h4>Quick Feedback</h4>
                        <form>
                            <textarea></textarea>
                            <button type="submit"><img src={SendIcon} alt="Start" className="send-image" />Send</button>
                        </form>
                    </div>
                </div>
                <p className="footer-note">© 2024 Secure Voting System. All rights reserved.</p>
        </footer>

        </div>
    );
};

export default StartPage;
