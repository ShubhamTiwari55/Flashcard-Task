import React, { useState } from 'react';
import { auth, googleProvider } from '../firebase';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      handleRedirect(user);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const userCredential = await signInWithPopup(auth, googleProvider);
      const user = userCredential.user;
      handleRedirect(user);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleRedirect = (user) => {
    // Example logic based on email domain
    if (user.email.includes('@admin.com')) {
      navigate('/admin');
    } else {
      navigate('/user');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-2xl font-semibold mb-4">Login</h2>
      <input
        className="w-80 p-2 mb-4 border rounded"
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="w-80 p-2 mb-4 border rounded"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <button
        className="px-6 py-2 mb-4 bg-green-500 text-white rounded hover:bg-green-600"
        onClick={handleLogin}
      >
        Login
      </button>
      <button
        className="px-6 py-2 mb-4 bg-red-500 text-white rounded hover:bg-red-600"
        onClick={handleGoogleSignIn}
      >
        Sign in with Google
      </button>
    </div>
  );
}

export default Login;
