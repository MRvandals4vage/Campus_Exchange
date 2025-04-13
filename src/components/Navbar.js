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
    <nav style={{ backgroundColor: '#000', color: '#FFD700', boxShadow: '0 4px 10px rgba(255, 215, 0, 0.2)' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '64px' }}>
          {/* Logo/Brand */}
          <Link to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: '#FFD700' }}>
          <img src="/campus-logo.png.jpeg" alt="CampusExchange Logo" style={{ height: '40px', width: '40px', filter: 'brightness(1.2)' }} />

            <span style={{ fontSize: '1.25rem', fontWeight: 'bold', marginLeft: '0.5rem' }}>CampusExchange</span>
          </Link>

          {/* Desktop Navigation */}
          <div style={{ display: 'flex', gap: '1rem' }}>
            {currentUser ? (
              <>
                <Link
                  to="/"
                  style={navButtonStyle}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#333'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                >
                  <FiHome size={20} />
                  <span>Home</span>
                </Link>

                <Link
                  to="/dashboard"
                  style={navButtonStyle}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#333'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                >
                  <FiUser size={20} />
                  <span>Dashboard</span>
                </Link>

                <Link
                  onClick={handleLogout}
                  style={{ ...navButtonStyle, cursor: 'pointer' }}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#333'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                >
                  <FiLogOut size={20} />
                  <span>Logout</span>
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  style={navButtonStyle}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#333'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                >
                  <FiLogIn size={20} />
                  <span>Login</span>
                </Link>

                <Link
                  to="/signup"
                  style={{
                    ...navButtonStyle,
                    backgroundColor: '#FFD700',
                    color: '#000',
                    fontWeight: '700'
                  }}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#e6c200'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = '#FFD700'}
                >
                  <FiPlusSquare size={20} />
                  <span>Sign Up</span>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

const navButtonStyle = {
  padding: '12px 24px',
  borderRadius: '8px',
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  backgroundColor: 'transparent',
  color: '#FFD700',
  fontWeight: '600',
  textDecoration: 'none',
  transition: 'background-color 0.3s ease',
};

export default Navbar;
