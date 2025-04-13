import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';

const Signup = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const nameRef = useRef();
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const userCred = await createUserWithEmailAndPassword(
        auth,
        emailRef.current.value,
        passwordRef.current.value
      );

      await updateProfile(userCred.user, {
        displayName: nameRef.current.value,
      });

      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4">
      <div className="bg-gray-900 shadow-xl rounded-xl p-10 w-full max-w-md border border-yellow-500">
        <h2 className="text-3xl font-bold mb-8 text-center text-yellow-400 tracking-wide">
          Create an Account
        </h2>
        {error && <p className="text-red-400 mb-4 text-sm">{error}</p>}
        <form onSubmit={handleSignup} className="space-y-5">
          <input
            ref={nameRef}
            type="text"
            placeholder="Full Name"
            className="w-full px-4 py-3 bg-black text-yellow-200 border border-yellow-600 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
            required
          />
          <input
            ref={emailRef}
            type="email"
            placeholder="Email"
            className="w-full px-4 py-3 bg-black text-yellow-200 border border-yellow-600 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
            required
          />
          <input
            ref={passwordRef}
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 bg-black text-yellow-200 border border-yellow-600 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
            required
          />
          <button
            type="submit"
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 rounded transition duration-200"
          >
            Sign Up
          </button>
        </form>
        <p className="mt-6 text-sm text-center text-yellow-300">
          Already have an account?{' '}
          <a href="/login" className="text-yellow-400 underline hover:text-yellow-200">
            Log in
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
