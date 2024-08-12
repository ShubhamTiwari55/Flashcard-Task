import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase'; // Adjust import path as needed
import { useNavigate } from 'react-router-dom';

function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // Redirect to the admin page after successful login
      navigate('/admin');
    } catch (error) {
      setError('Failed to login. Please check your email and password.');
      console.error(error.message);
    }
  };

  return (
    <div className="bg-black text-red-400 flex flex-col items-center justify-center h-screen p-4">
      <h1 className="text-4xl font-bold mb-4">Admin Login</h1>
      <form onSubmit={handleLogin} className="bg-gray-800 p-6 rounded-lg shadow-lg space-y-4 w-full max-w-sm">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Admin Email"
          className="w-full px-4 py-2 border border-red-600 bg-gray-700 text-red-400 rounded"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full px-4 py-2 border border-red-600 bg-gray-700 text-red-400 rounded"
        />
        <button
          type="submit"
          className="w-full px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Login
        </button>
        {error && <p className="text-red-300">{error}</p>}
      </form>
    </div>
  );
}

export default AdminLogin;
