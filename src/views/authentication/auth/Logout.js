import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    // Remove the token from localStorage
    localStorage.removeItem('authToken');
    localStorage.removeItem('googleId'); // If you saved the Google ID as well
    localStorage.removeItem('userAvatar'); 

    // Optionally clear other user data from localStorage
    // localStorage.clear(); // This will clear all localStorage, be cautious with this

    // Redirect to the login page or home page
    navigate('/auth/login'); // Adjust the path based on your routing setup
  }, [navigate]);

  return null; // This component doesn't need to render anything
}

export default Logout;
