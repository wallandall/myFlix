import React from 'react';
import axios from 'axios';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import Moment from 'react-moment';

import { Link } from 'react-router-dom';

import './profile-view.scss';

export class ProfileView extends React.Component {
  constructor() {
    super();
    this.state = {
      profile: [],
      name: null,
      username: null,
      password: null,
      email: null,
      birthday: null
    };
  }

  componentDidMount() {
    //authentication
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.getProfile(accessToken);
    }
  }

  getProfile() {
    let username = localStorage.getItem('user');
    let token = localStorage.getItem('token');

    axios
      .get(`https://my-flix-tracker.herokuapp.com/api/v1/users/${username}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(response => {
        this.setState({
          profile: response.data.data.user,
          name: response.data.data.user.name,
          username: response.data.data.user.username,
          password: response.data.data.user.password,
          email: response.data.data.user.email,
          birthday: response.data.data.user.birthday
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  updateProfile() {
    console.log('Test');
  }

  render() {
    const { profile, name, username, password, email, birthday } = this.state;
    // let dob = birthday.toString();
    // console.log(dob);
    // let name = profile.name;
    // let username = profile.username;
    // let email = profile.email;
    // let dob = profile.birthday;
    // let test = dob;
    // console.log(test);

    return (
      <Container className="profile">
        <Row>
          <Col>
            <h1>{name}</h1>
          </Col>
        </Row>
        <Row>
          <Col className="profile_detail" md={4}>
            <h3>Profile Information </h3>
            <p>
              <strong>Username:</strong> {username}
            </p>
            <p>
              <strong>Email:</strong> {email}
            </p>
            <p>
              <strong>Date of Birth:</strong> {birthday}
            </p>
            <p>
              <strong>Age:</strong>{' '}
              <Moment fromNow ago>
                {birthday}
              </Moment>{' '}
              old
            </p>
          </Col>
          <Col className="profile_edit" md={6}>
            <h3>Edit Profile </h3>

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
                onClick={this.updateProfile}
              >
                Update Profile
              </Button>
            </Form>
          </Col>
        </Row>
        <Row>
          <Col>
            <Link to={`/`}>
              <Button variant="outline-light">Home</Button>
            </Link>
          </Col>
        </Row>
        <Row>
          <Col>
            <h1>Favourite Movies</h1>
          </Col>
        </Row>
      </Container>
    );
  }
}
