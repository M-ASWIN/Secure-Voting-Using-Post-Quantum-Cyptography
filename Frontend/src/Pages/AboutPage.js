import React from 'react';
import '../Styles/FeaturesPage.css'; // Link to your CSS file
import AboutImg from '../assets/About.png'; // Replace with your image path

const AboutPage = () => {
    return (
        <div className="about-page-container" >
            <img src={AboutImg} alt="Full Page" className="about-page-image" />
        </div>
    );
};

export default AboutPage;
