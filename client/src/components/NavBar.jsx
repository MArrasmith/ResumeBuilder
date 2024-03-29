import React from "react";
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container, Modal, Tab } from 'react-bootstrap';
import Signup from '../pages/Signup';
import Login from '../pages/Login';
import Auth from '../utils/auth';

const NavBar = () => {
    const [showModal, setShowModal] = useState(false);
  
    return (
      <>
      <div className='navbar-container'>
        <Navbar bg='dark' variant='dark' expand='lg'>
          <Container fluid>
            <Navbar.Toggle aria-controls='navbar' />
            <Navbar.Collapse id='navbar' className='d-flex flex-row-reverse'>
              <Nav className='ml-auto d-flex'>
                {Auth.loggedIn() ? (
                  <>
                    <Nav.Link as={Link} to='/home'>
                        Home
                    </Nav.Link>
                    <Nav.Link as={Link} to='/resume'>
                        View/Create Resumes
                    </Nav.Link>
                    <Nav.Link onClick={Auth.logout}>Logout</Nav.Link>
                  </>
                ) : (
                  <Nav.Link onClick={() => setShowModal(true)}>Login/Sign Up</Nav.Link>
                )}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <Modal
          size='lg'
          show={showModal}
          onHide={() => setShowModal(false)}
          aria-labelledby='signup-modal'>
          <Tab.Container defaultActiveKey='login'>
            <Modal.Header closeButton>
              <Modal.Title id='signup-modal'>
                <Nav variant='pills'>
                  <Nav.Item>
                    <Nav.Link eventKey='login'>Login</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey='signup'>Sign Up</Nav.Link>
                  </Nav.Item>
                </Nav>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Tab.Content>
                <Tab.Pane eventKey='login'>
                  <Login handleModalClose={() => setShowModal(false)} />
                </Tab.Pane>
                <Tab.Pane eventKey='signup'>
                  <Signup handleModalClose={() => setShowModal(false)} />
                </Tab.Pane>
              </Tab.Content>
            </Modal.Body>
          </Tab.Container>
        </Modal>
        </div>
      </>
    );
  };
 
export default NavBar;