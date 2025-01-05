import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './Pages/LoginPage';
import RegisterPage from './Pages/RegisterPage';
import ForgotPassPage from './Pages/ForgotPassPage';
import StartPage from './Pages/StartPage'
import FeaturesPage from './Pages/FeaturesPage';
import AboutPage from './Pages/AboutPage';
import AdminDashboard from './Pages/AdminDashboard';
import UserProfile from './Pages/UserProfile';
import ProtectedRoute from './components/ProtectedRoute';
import ContactPage from './Pages/ContactPage';
import ElectionPage from './Pages/ElectionPage';
import ProfilePage from './Pages/ProfilePage';
// import VotingPage from './Pages/VotingPage';
// import ResultsPage from './Pages/ResultsPage';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" exact element={<StartPage />} />
                <Route path="/login" exact element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage/>} />
                <Route path="/features" exact element={<FeaturesPage />} />
                <Route path="/about" exact element={<AboutPage />} />
                <Route path="/forgot-password" element={<ForgotPassPage/>} />
                <Route path="/current-elections" element={<ElectionPage />} />
                <Route path="/contact-us" element={<ContactPage />} />
                <Route path="/personal-profile" element={<ProfilePage />} />
                <Route
                    path="/admin-dashboard"
                    element={
                        <ProtectedRoute requiredRole="ADMIN">
                            <AdminDashboard />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/user-profile"
                    element={
                        <ProtectedRoute requiredRole="USER">
                            <UserProfile />
                        </ProtectedRoute>
                    }
                />
                {/* <Route path="/vote" component={VotingPage} />
                <Route path="/results" component={ResultsPage} /> */}
            </Routes>
        </Router>
    );
}

export default App;
