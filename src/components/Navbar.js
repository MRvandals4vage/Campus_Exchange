import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { FiHome, FiUser, FiLogIn, FiLogOut, FiPlusSquare } from 'react-icons/fi';

const Navbar = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Brand */}
          <Link to="/" className="flex-shrink-0 flex items-center space-x-2 hover:opacity-90 transition-opacity">
            <img src="/path/to/your/logo.png" alt="CampusExchange Logo" className="h-8 w-8" />
            <span className="text-xl font-bold tracking-tight">CampusExchange</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {currentUser ? (
              <>
                <Link
                  to="/"
                  className="px-3 py-2 rounded-md flex items-center space-x-1 hover:bg-blue-500 transition-colors"
                >
                  <FiHome className="h-5 w-5" />
                  <span>Home</span>
                </Link>
                <Link
                  to="/dashboard"
                  className="px-3 py-2 rounded-md flex items-center space-x-1 hover:bg-blue-500 transition-colors"
                >
                  <FiUser className="h-5 w-5" />
                  <span>Dashboard</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-3 py-2 rounded-md flex items-center space-x-1 hover:bg-blue-500 transition-colors"
                >
                  <FiLogOut className="h-5 w-5" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-3 py-2 rounded-md flex items-center space-x-1 hover:bg-blue-500 transition-colors"
                >
                  <FiLogIn className="h-5 w-5" />
                  <span>Login</span>
                </Link>
                <Link
                  to="/signup"
                  className="px-3 py-2 rounded-md flex items-center space-x-1 bg-white text-blue-600 hover:bg-gray-100 transition-colors"
                >
                  <FiPlusSquare className="h-5 w-5" />
                  <span>Sign Up</span>
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              className="inline-flex items-center justify-center p-2 rounded-md hover:bg-blue-500 focus:outline-none"
              onClick={() => setIsOpen(!isOpen)}
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className={`md:hidden ${isOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {currentUser ? (
            <>
              <Link
                to="/"
                className="block px-3 py-2 rounded-md text-base font-medium hover:bg-blue-500 transition-colors"
              >
                Home
              </Link>
              <Link
                to="/dashboard"
                className="block px-3 py-2 rounded-md text-base font-medium hover:bg-blue-500 transition-colors"
              >
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium hover:bg-blue-500 transition-colors"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="block px-3 py-2 rounded-md text-base font-medium hover:bg-blue-500 transition-colors"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="block px-3 py-2 rounded-md text-base font-medium bg-white text-blue-600 hover:bg-gray-100 transition-colors"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
