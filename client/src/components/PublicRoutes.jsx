import React, { useEffect } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import Auth from '../utils/auth';

const PublicRoute = () => {
  let navigate = useNavigate();
  let loggedIn = Auth.loggedIn();

  useEffect(() => {
    if (loggedIn) {
      navigate('/home');
    }
  }, [loggedIn, navigate]);
  {/* if user logged in redirects to homepage, if not then page is null */}
  return !loggedIn ? <Outlet /> : null;
};

export default PublicRoute;