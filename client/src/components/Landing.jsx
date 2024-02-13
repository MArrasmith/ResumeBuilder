import React, { useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import Auth from '../utils/auth';

const LandingPage = () => {
  const navigate = useNavigate();
  const [isLoggingIn, setIsLoggingIn] = React.useState(true);
  let loggedIn = Auth.loggedIn();

  //checks if logged in and redirects if so
  useEffect(() => {
    if (!loggedIn) {
      navigate('/');
    }
  }, [loggedIn, navigate]);

  const handleLoginClick = () => {
    setIsLoggingIn(true);
  };

  const handleSignupClick = () => {
    setIsLoggingIn(false);
  };

  return (
    <div>
      <Button variant="primary" onClick={handleLoginClick}>Log In</Button>
      <Button variant="secondary" onClick={handleSignupClick}>Sign Up</Button>
      {isLoggingIn ? <Login /> : <Signup />}
    </div>
  );
};

export default LandingPage;