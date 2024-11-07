import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Navigation from './components/Navigation';
import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/Profile';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
    <Router>
      <Navigation />
      <Container className="mt-4">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route 
            path="/profile" 
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } 
          />
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </Container>
    </Router>
  );
};

// Protected Route component to handle authentication
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('user');
  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default App;