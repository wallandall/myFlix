import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import './login-view.scss';
import axios from 'axios';
//import { response } from 'express';

export function LoginView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = useCallback(
    e => {
      e.preventDefault();
      axios
        .post('https://my-flix-tracker.herokuapp.com/api/v1/login', {
          username: username,
          password: password
        })
        .then(response => {
          const data = response.data;
          props.onLoggedIn(data);
        })
        .catch(e => {
          console.log('Could not find user!');
        });
    },
    [username, password]
  );

  return (
    <Row className="justify-content-center">
      <Col xs={11} sm={8} md={6} className="login-form">
        <Form>
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

          <Button
            variant="outline-light"
            type="submit"
            size="lg"
            block
            onClick={handleSubmit}
          >
            Login
          </Button>

          <Button
            variant="outline-light"
            size="lg"
            block
            onClick={() => props.onClick()}
          >
            Create a New Account
          </Button>
        </Form>
      </Col>
    </Row>
  );
}

LoginView.propTypes = {
  onLoggedIn: PropTypes.func.isRequired,
  onClick: PropTypes.func
};
