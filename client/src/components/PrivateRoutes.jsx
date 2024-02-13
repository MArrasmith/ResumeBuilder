import React, { useEffect } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import Auth from '../utils/auth';

//separates routes from logged out users, outlet sends logged in user to route
const PrivateRoute = () => {
  let navigate = useNavigate();
  let loggedIn = Auth.loggedIn();

  useEffect(() => {
    if (!loggedIn) {
      navigate('/login');
    }
  }, [loggedIn, navigate]);

  return loggedIn ? <Outlet /> : null;
};

export default PrivateRoute;