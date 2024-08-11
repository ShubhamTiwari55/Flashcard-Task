import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './Auth/Authcontext';
import { logout } from './Auth/authService'; // Import the logout function

function Home() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen p-4">
      <h1 className="text-4xl font-bold mb-4">Welcome to the Flashcard App</h1>
      {!currentUser ? (
        <div className="space-y-4">
          <Link
            to="/login"
            className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Sign Up
          </Link>
          <Link
            to="/admin-login"
            className="px-6 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
          >
            Admin Login
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          <Link
            to="/user"
            className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Go to User Page
          </Link>
          {currentUser.email.includes('@admin.com') && (
            <Link
              to="/admin"
              className="px-6 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Go to Admin Page
            </Link>
          )}
          <button
            onClick={handleLogout}
            className="px-6 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}

export default Home;
