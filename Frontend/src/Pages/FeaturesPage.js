import React from 'react';
import '../Styles/FeaturesPage.css'; // Link to your CSS file
import DesktopImg from '../assets/Desktop.png'; // Replace with your image path

const FeaturesPage = () => {
    return (
        <div className="image-page-container">
            <img src={DesktopImg} alt="Full Page" className="full-page-image" />
        </div>
    );
};

export default FeaturesPage;
