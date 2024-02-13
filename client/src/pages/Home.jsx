import React, { useState, useEffect } from 'react';
import { Button, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import ResumeApp from '../components/ResumeApp';
import Auth from '../utils/auth';
import './ResumeBuilder.css'

const HomePage = ({ userId }) => {
  let navigate = useNavigate();
  let loggedIn = Auth.loggedIn();

  useEffect(() => {
    if (!loggedIn) {
      navigate('/login');
    }
  }, [loggedIn, navigate]);

  const [isCreatingResume, setIsCreatingResume] = useState(false);

  const handleCreateResumeClick = () => {
    setIsCreatingResume(true);
    navigate('/resume/create');
  };

  const handleViewResumesClick = () => {
    setIsCreatingResume(false);
    navigate('/resume/resumes');
  };

  const handleLogoutClick = () => {
    Auth.logout();
    navigate('/login');
  };

  return (
    <Container>
      {isCreatingResume ? (
        <ResumeApp userId={userId} />
      ) : (
        <>
          <Button className="create-btn" variant="primary" onClick={handleCreateResumeClick}>Create a Resume</Button>
          <Button variant="secondary" onClick={handleViewResumesClick}>View Resumes</Button>
          <Button variant="danger" onClick={handleLogoutClick}>Logout</Button>
        </>
      )}
    </Container>
  );
};

export default HomePage;