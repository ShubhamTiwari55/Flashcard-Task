import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Signup from './Auth/Signup';
import Login from './Auth/Login';
import App from './App';
import Admin from './Admin';
import ProtectedRoute from './Auth/ProtectedRoute';
import { AuthProvider } from './Auth/Authcontext';
import AdminLogin from './AdminLogin';

function Main() {
    return (
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin-login" element={<AdminLogin />} /> {/* Add this route */}
            <Route path="/user" element={<App />} />
            <Route
              path="/admin"
              element={<ProtectedRoute element={Admin} />}
            />
            {/* Fallback route for 404 pages */}
            <Route path="*" element={<Home />} />
          </Routes>
        </Router>
      </AuthProvider>
    );
  }

export default Main;
