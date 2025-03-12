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
import CreateElection from './Pages/CreateElection';
import UserLists from './Pages/UserLists';
import UserDetails from './Pages/UserDetails';
import ViewResults from './Pages/ViewResults';
import CandidatesList from './Pages/CandidatesList';
import VotePage from './Pages/VotePage';
import ResultsAnalysis from './Pages/ResultsAnalysis';
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
               
                <Route
                    path="/user-profile"
                    element={
                        <ProtectedRoute requiredRole="USER">
                            <UserProfile />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/personal-profile"
                    element={
                        <ProtectedRoute requiredRole="USER">
                            <ProfilePage />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/current-elections"
                    element={
                        <ProtectedRoute requiredRole="USER">
                            <ElectionPage />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/contact-us"
                    element={
                        <ProtectedRoute requiredRole="USER">
                            <ContactPage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/vote/:electionId"
                    element={
                        <ProtectedRoute requiredRole="USER">
                            <VotePage />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/analyze/:electionId"
                    element={
                        <ProtectedRoute requiredRole="ADMIN">
                            <ResultsAnalysis />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/admin-dashboard"
                    element={
                        <ProtectedRoute requiredRole="ADMIN">
                            <AdminDashboard />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/create-Elections"
                    element={
                        <ProtectedRoute requiredRole="ADMIN">
                            <CreateElection />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/view-results"
                    element={
                        <ProtectedRoute requiredRole="ADMIN">
                            <ViewResults />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/users/:userId"
                    element={
                        <ProtectedRoute requiredRole="ADMIN">
                            <UserDetails />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/users-list"
                    element={
                        <ProtectedRoute requiredRole="ADMIN">
                            <UserLists />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/candidates-list"
                    element={
                        <ProtectedRoute requiredRole="ADMIN">
                            <CandidatesList />
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
