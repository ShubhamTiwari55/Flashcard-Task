import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, googleProvider } from '../firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignup, setIsSignup] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isSignup) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      navigate('/user');
    } catch (error) {
      console.error('Authentication Error:', error);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate('/user');
    } catch (error) {
      console.error('Google Login Error:', error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
      <h2 className="text-3xl font-bold mb-6">{isSignup ? 'Sign Up' : 'Login'}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 rounded-lg bg-gray-800 text-white"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 rounded-lg bg-gray-800 text-white"
        />
        <button
          type="submit"
          className="w-full p-2 rounded-lg bg-red-600 hover:bg-red-700 transition duration-300 ease-in-out"
        >
          {isSignup ? 'Sign Up' : 'Login'}
        </button>
      </form>
      <button
        onClick={handleGoogleLogin}
        className="mt-4 p-2 rounded-lg bg-red-600 hover:bg-red-700 transition duration-300 ease-in-out"
      >
        Sign in with Google
      </button>
      <p className="mt-4">
        {isSignup ? 'Already have an account?' : "Don't have an account?"}
        <button
          onClick={() => setIsSignup(!isSignup)}
          className="text-red-400 hover:text-red-500 ml-2"
        >
          {isSignup ? 'Login here' : 'Sign up here'}
        </button>
      </p>
      <p className="mt-4">
        <button
          onClick={() => navigate('/admin/login')}
          className="text-red-400 hover:text-red-500"
        >
          Login as Admin
        </button>
      </p>
    </div>
  );
};

export default Login;
