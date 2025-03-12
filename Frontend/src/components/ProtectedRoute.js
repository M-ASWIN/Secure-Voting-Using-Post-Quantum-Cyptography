// src/components/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';


const ProtectedRoute = ({ children, requiredRole }) => {
    const sessioncookie = localStorage.getItem('session_id'); 
    var isAuthenticated = false;
    console.log(sessioncookie);
    if(!!sessioncookie){
        isAuthenticated=true;
        // Replace 'key_name' with the actual key
    }
    console.log(isAuthenticated,"hello");

    const userRole = localStorage.getItem('userRole'); // Or get the role from the backend session
    
    if (!isAuthenticated) {
        // If not authenticated, redirect to login page
        return <Navigate to="/" />;
    }

    if (requiredRole && userRole !== requiredRole) {
        // If user role doesn't match, redirect to unauthorized page
        return <Navigate to="/" />;
    }

    return children; // Allow access to the route if authenticated and role matches
};

export default ProtectedRoute;
