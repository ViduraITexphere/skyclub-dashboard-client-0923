// src/utils/authUtils.js
import {jwtDecode} from 'jwt-decode';

export const isTokenExpired = (token) => {
  try {
    const decodedToken = jwtDecode(token);
    const expirationTime = decodedToken.exp * 1000; // Convert seconds to milliseconds
    const currentTime = Date.now();
    return currentTime > expirationTime;
  } catch (error) {
    console.error('Error decoding token:', error);
    return true; // Assume expired if there's an error
  }
};
