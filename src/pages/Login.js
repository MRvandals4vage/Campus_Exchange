import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../firebase';
import LoadingSpinner from '../components/LoadingSpinner';

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const provider = new GoogleAuthProvider();

  useEffect(() => () => setError(''), []);

  const handleSignIn = async () => {
    setLoading(true);
    setError('');
    try {
      const result = await signInWithPopup(auth, provider);
      if (result?.user) {
        await new Promise(resolve => setTimeout(resolve, 100));
        navigate('/');
        return;
      }
      throw new Error('Sign-in completed but no user found');
    } catch (err) {
      if (!err.message.includes('auth/popup-closed-by-user')) {
        setError('Sign-in failed. Please try again.');
        console.error('Sign-in error:', err);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4">
      <div className="bg-gray-900 shadow-xl rounded-xl p-10 w-full max-w-md border border-yellow-500">
        <h1 className="text-3xl font-bold mb-8 text-center text-yellow-400 tracking-wide">
          CampusExchange Login
        </h1>
        {error && <p className="text-red-400 mb-4 text-sm">{error}</p>}
        <button
          onClick={handleSignIn}
          disabled={loading}
          className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 rounded transition duration-200 flex items-center justify-center disabled:opacity-50"
        >
          {loading ? <LoadingSpinner /> : 'Sign in with Google'}
        </button>
      </div>
    </div>
  );
};

export default Login;
