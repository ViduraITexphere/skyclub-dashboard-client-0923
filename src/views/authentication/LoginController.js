import React from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; // Ensure this is correctly imported

function LoginController() {
  const navigate = useNavigate();

  const handleSuccess = async (credentialResponse) => {
    try {
      const { credential } = credentialResponse;

      // Decode the token received from Google
      const decodedToken = jwtDecode(credential);
      console.log('Decoded Token:', decodedToken);

      // Extract the user's avatar (profile picture)
      const userAvatar = decodedToken.picture;
      console.log('User Avatar URL:', userAvatar);

      // Save the JWT token, Google ID, and avatar URL to localStorage
      localStorage.setItem('authToken', credential);
      localStorage.setItem('googleId', decodedToken.sub);
      localStorage.setItem('userAvatar', userAvatar); // Save the avatar URL
      console.log('Google ID saved:', decodedToken.sub);

      // Redirect to the dashboard
      navigate('/dashboard');
    } catch (error) {
      console.error('Error handling the login:', error);
    }
  };

  return (
    <GoogleOAuthProvider clientId="874892976318-boa6tptdvtnq2hqoam5rpti83rsjqn8r.apps.googleusercontent.com">
      <GoogleLogin
        theme="outline"
        shape="square"
        type="standard"
        color-type="dark"
        size="large"
        onSuccess={handleSuccess}
        onError={() => {
          console.log('Login Failed');
        }}
      />
    </GoogleOAuthProvider>
  );
}

export default LoginController;
