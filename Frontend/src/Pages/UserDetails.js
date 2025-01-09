import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../Styles/UsersList.css"

const UserDetails = () => {
  const { userId } = useParams(); // Get the userId from the URL
  const [user, setuser] = useState(null);

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
  useEffect(() => {
    // Fetch the user details from the backend by userId
    fetch(`http://localhost:8080/api/users/${userId}`)
      .then((response) => response.json())
      .then((data) => setuser(data))
      .catch((error) => console.error("Error fetching user details:", error));
  }, [userId]); // Fetch when the userId changes

  if (!user) {
    return <p>Loading user details...</p>;
  }

  return (
    <div className="user-profile-section">
    <div className="user-profile-photo-container">
        <img
            src="https://w7.pngwing.com/pngs/798/436/png-transparent-computer-icons-user-profile-avatar-profile-heroes-black-profile-thumbnail.png"
            alt="Profile"
            className="user-profile-photo-img"
        />
    </div>

    <div className="user-profile-details-container">
        <div className="user-profile-details-container-title">
            <h1 className="user-profile-title">User Profile</h1>
        </div>
       
        <div className="user-profile-detail-box-inner">
            <p>Name:</p>
            <h2>
                <strong>{user.name.charAt(0).toUpperCase() + user.name.slice(1).toLowerCase()}</strong>
            </h2>
        </div>

        <div className="user-profile-detail-box-inner">
            <p>Father's Name:</p>
            <h2><strong>  {user.fatherName.charAt(0).toUpperCase() + user.fatherName.slice(1).toLowerCase()}</strong> </h2>
        </div>

        <div className="user-profile-box-inner">
            <div className="user-profile-dob-container">
                <p>DOB:</p>
                <h2><strong>{user.dob}</strong></h2>
            </div>
            <div className="user-profile-age-container">
                <p>Age:</p>
                <h2><strong>{calculateAge(user.dob)}</strong></h2>
            </div>
        </div>

        <div className="user-profile-detail-box-inner">
            <p>Email:</p>
            <h2><strong>  {user.email}</strong> </h2>
        </div>
        
        <div className="user-profile-detail-box-inner">
            <p>Phone:</p>
            <h2><strong>+91 {user.mobileNumber}</strong> </h2>
        </div>

        <div className="user-profile-box-inner">
            <div className="user-profile-dob-container">
                <p>Aadhar Number:</p>
                <h2><strong>  {user.aadharNumber}</strong> </h2>
            </div>
            <div className="user-profile-age-container">
                <p>Verified:</p>
                <h2>True</h2>
            </div>
        </div>
    </div>
</div>

  );
};

export default UserDetails;
