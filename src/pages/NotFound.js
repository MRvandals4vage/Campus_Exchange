import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="text-center mt-24">
      <h2 className="text-3xl font-bold mb-4">404 - Page Not Found</h2>
      <Link to="/" className="text-blue-500 underline">
        Go Home
      </Link>
    </div>
  );
};

export default NotFound;
