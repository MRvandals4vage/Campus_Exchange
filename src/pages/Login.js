import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase";
import LoadingSpinner from '../components/LoadingSpinner';

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const provider = new GoogleAuthProvider();
  
  // Clear error when component unmounts or before new attempt
  useEffect(() => () => setError(''), []);

  const handleSignIn = async () => {
    setLoading(true);
    setError('');
    try {
      const result = await signInWithPopup(auth, provider);
      
      // Successful sign-in check
      if (result?.user) {
        // Delay navigation slightly to ensure state updates
        await new Promise(resolve => setTimeout(resolve, 100));
        navigate('/');
        return; // Exit early on success
      }
      
      throw new Error('Sign-in completed but no user found');
    } catch (err) {
      // Only show errors for actual failures, not successful logins
      if (!err.message.includes('auth/popup-closed-by-user')) {
        setError('Sign-in failed. Please try again.');
        console.error('Sign-in error:', err);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12 p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-6">CampusExchange Login</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <button
        onClick={handleSignIn}
        disabled={loading}
        className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center justify-center disabled:opacity-50"
      >
        {loading ? <LoadingSpinner /> : 'Sign in with Google'}
      </button>
    </div>
  );
};

export default Login;