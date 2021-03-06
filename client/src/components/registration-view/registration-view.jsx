import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import './registration-view.scss';
import axios from 'axios';

export function RegistrationView(props) {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');

  const handleSubmit = useCallback(
    e => {
      e.preventDefault();
      axios
        .post('https://my-flix-tracker.herokuapp.com/api/v1/users', {
          name: name,
          username: username,
          password: password,
          email: email,
          birthday: birthday
        })
        .then(response => {
          const data = response.data;

          window.open('/client', '_self');
        })
        .catch(e => {
          console.log('Could not register user!', e);
        });
    },
    [name, username, password, email, birthday]
  );

  return (
    <Container>
      <Row className="justify-content-center">
        <Col xs={11} sm={8} md={6} className="registration-form">
          <Form>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Name"
                value={name}
                onChange={e => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Username"
                value={username}
                onChange={e => setUsername(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formDoB">
              <Form.Label>Date of Birth</Form.Label>
              <Form.Control
                type="date"
                placeholder="Date of Birth"
                value={birthday}
                onChange={e => setBirthday(e.target.value)}
              />
            </Form.Group>

            <Button
              variant="outline-light"
              size="lg"
              block
              onClick={handleSubmit}
            >
              Create a New Account
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

RegistrationView.propTypes = {};
