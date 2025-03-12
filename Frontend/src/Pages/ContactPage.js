import React from "react";
import { NavLink } from "react-router-dom";
import "../Styles/UserProfile.css";
import "../Styles/ContactPage.css";
import homeIcon from "../assets/icons/home-icon-silhouette.png";

const ContactPage = () => {
    const user = JSON.parse(localStorage.getItem("user"));

    return (
        <div className="start-container-user">
            <nav className="navbar-user">
                <ul className="nav-links">
                    <li>
                        <a href="/user-profile">
                            <img src={homeIcon} alt="home" />
                        </a>
                    </li>
                    <li>
                        <NavLink to="/personal-profile" className={({ isActive }) => (isActive ? "active-link" : "")}>
                            Personal Info
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/current-elections" className={({ isActive }) => (isActive ? "active-link" : "")}>
                            Elections
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/contact-us" className={({ isActive }) => (isActive ? "active-link" : "")}>
                            Contact Us
                        </NavLink>
                    </li>
                    <li>
                        <button className="start-logout-button" onClick={async () => { 
                        const userId = user.id;
                        if (userId) {
                            await fetch(`http://localhost:8080/auth/logout?userId=${userId}`, { 
                                method: "PUT" 
                            });
                        }
                            localStorage.clear(); 
                            window.location.href = "/";
                        }}>
                            Logout
                        </button>
                    </li>
                </ul>
            </nav>
            <div className="contact-container">
                <h2>Contact Us</h2>
                <p>If you have any queries, feel free to reach out to us!</p>
                
                <div className="contact-info">
                    <p><strong>Email:</strong> securevote@example.com</p>
                    <p><strong>Phone:</strong> 8888 8888 88</p>
                </div>

                <form className="contact-form">
                    <label htmlFor="name">Name:</label>
                    <input type="text" id="name" name="name" required />
                    
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" required />
                    
                    <label htmlFor="message">Message:</label>
                    <textarea id="message" name="message" rows="4" required></textarea>
                    
                    <button type="submit" className="contact-submit">Send Message</button>
                </form>
            </div>
            </div>
    );
};

export default ContactPage;
