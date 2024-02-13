import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';

import Auth from '../utils/auth';

const Signup = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    firstLastName: '',
    password: '',
  });
  const [addUser, { error, data }] = useMutation(ADD_USER);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log("29", formState);

    try {
      const { data } = await addUser({
        variables: { ...formState },
      });

      Auth.login(data.addUser.token);
    } catch (e) {
      console.error(e);
    }
        
    //redirects after login
    window.location.assign('/home');

    //resets formstate
    setFormState({
      email: '',
      password: '',
    });
  };

  return (
    <Container className="d-flex justify-content-center mb-4">
      <Col xs={12} lg={10}>
        <Card>
          <Card.Header className="bg-dark text-light p-2">Sign Up</Card.Header>
          <Card.Body>
            {data ? (
              <p>
                Signup Successful!{' '}
                <Link to="/home">Home</Link>
              </p>
            ) : (
              <Form onSubmit={handleFormSubmit}>
                <Form.Group controlId="formName">
                  <Form.Control
                    type="text"
                    placeholder="Your username"
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group controlId="formFirstLastName">
                  <Form.Control
                    type="text"
                    placeholder="Your First and Last Name"
                    name="firstLastName"
                    value={formState.firstLastName}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group controlId="formEmail">
                  <Form.Control
                    type="email"
                    placeholder="Your email"
                    name="email"
                    value={formState.email}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group controlId="formPassword">
                  <Form.Control
                    type="password"
                    placeholder="******"
                    name="password"
                    value={formState.password}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </Form>
            )}

            {error && (
              <Alert variant="danger" className="my-3 p-3">
                {error.message}
              </Alert>
            )}
          </Card.Body>
        </Card>
      </Col>
    </Container>
  );
};

export default Signup;