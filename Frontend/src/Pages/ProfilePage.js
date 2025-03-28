import React from "react";
import { NavLink } from "react-router-dom";
import "../Styles/Profile.css";
import homeIcon from "../assets/icons/home-icon-silhouette.png"


const ProfilePage = () => {
    const user = JSON.parse(localStorage.getItem("user"));

    function calculateAge(dob) {
        const birthDate = new Date(dob);
        const today = new Date();
        const age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            return age - 1;
        }
        return age;
    }
    
    return (
        <div className="start-container-user">
        <nav className="navbar-user">
            <ul className="navlinks">
                <li>
                <div className="hello">
                        <a href="/user-profile">
                        <img src={homeIcon} alt="home"></img>
                        </a>
                    </div>
                </li>
                <li>
                    <NavLink 
                        to="/personal-profile" 
                        className={({ isActive }) => (isActive ? "active-link" : "")}>
                        Personal Info
                    </NavLink>
                </li>
                <li>
                    <NavLink 
                        to="/current-elections" 
                        className={({ isActive }) => (isActive ? "active-link" : "")}>
                        Elections
                    </NavLink>
                </li>
                <li>
                    <NavLink 
                        to="/contact-us" 
                        className={({ isActive }) => (isActive ? "active-link" : "")}>
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

        <div className="profile-section">
                <div className="profile-photo-container">
                    <img
                        src="https://w7.pngwing.com/pngs/798/436/png-transparent-computer-icons-user-profile-avatar-profile-heroes-black-profile-thumbnail.png"
                        alt="Profile"
                        className="profile-photo-img"
                    />
                </div>
                <div className="profile-details-container">
                    <div className="profile-details-container-title"> <h1 className="profile-title">User Profile</h1></div>
                   
                    <div className="profile-detail-box-inner">
                        <p>Name:</p>
                        <h2>
                            <strong>{user.name.charAt(0).toUpperCase() + user.name.slice(1).toLowerCase()}</strong>
                        </h2>
                    </div>
                    <div className="profile-detail-box-inner">
                        <p>Father's Name : </p>
                        <h2><strong>  {user.fatherName.charAt(0).toUpperCase() + user.fatherName.slice(1).toLowerCase()}</strong> </h2>
                    </div>

                    <div className="profile-box-inner">
                    <div className="dob-container">
                        <p>DOB:</p>
                        <h2><strong>{user.dob}</strong></h2>
                    </div>
                    <div className="age-container">
                        <p>Age :</p>
                        <h2><strong>{calculateAge(user.dob)}</strong></h2>
                    </div>
                    </div>

                    <div className="profile-detail-box-inner">
                        <p>Email:</p>
                        <h2><strong>  {user.email}</strong> </h2>
                    </div>
                    <div className="profile-detail-box-inner">
                        <p>Phone :</p>
                        <h2><strong>+91 {user.mobileNumber}</strong> </h2>
                     </div>
                     <div className="profile-box-inner">
                    <div className="dob-container">
                        <p>Aadhar Number :</p>
                        <h2><strong>  {user.aadharNumber}</strong> </h2>
                    </div>
                    <div className="age-container">
                        <p>Verified : </p>
                        <h2>True</h2>
                    </div>
                    </div>
                   
                  
                </div>
            </div>
        </div>
    );
};



export default ProfilePage;
