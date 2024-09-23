// src/components/AuthCheck.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { isTokenExpired } from 'src/utils/authUtils';

const AuthCheck = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkToken = () => {
      const token = localStorage.getItem('authToken');
      if (token && isTokenExpired(token)) {
        // Token has expired
        localStorage.removeItem('authToken');
        localStorage.removeItem('googleId');
        localStorage.removeItem('userAvatar');
        navigate('/auth/login'); // Redirect to login page
      }
    };

    // Check token expiration every minute (60000 ms)
    const intervalId = setInterval(checkToken, 60000);

    // Cleanup on component unmount
    return () => clearInterval(intervalId);
  }, [navigate]);

  return null; // This component does not render anything
};

export default AuthCheck;
