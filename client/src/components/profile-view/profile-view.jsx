import React from 'react';
import axios from 'axios';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Tab from 'react-bootstrap/Tab';

import Nav from 'react-bootstrap/Nav';
import Alert from 'react-bootstrap/Alert';

import Moment from 'react-moment';

import { Link } from 'react-router-dom';

import './profile-view.scss';

export class ProfileView extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      username: null,
      password: null,
      email: null,
      birthday: null
    };

    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
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
          birthday: response.data.data.user.birthday.substring(0, 10)
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  deleteProfile() {
    let username = localStorage.getItem('user');
    let token = localStorage.getItem('token');
    axios
      .delete(
        `https://my-flix-tracker.herokuapp.com/api/v1/users/${username}`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      )
      .then(response => {
        alert('Your Account has been deleted!');
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.open('/', '_self');
      })
      .catch(event => {
        alert('Could not delete profile');
      });
  }

  updateProfile() {
    axios
      .put(
        `https://my-flix-tracker.herokuapp.com/api/v1/users/${localStorage.getItem(
          'user'
        )}`,
        {
          username: username,
          password: password,
          birthday: birthday,
          email: email
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        }
      )
      .then(res => {
        const data = res.data;
        alert('Your profile data was updated successfully');
        localStorage.setItem('user', data.Username);
        window.open(`/users/${localStorage.getItem('user')}`);
      })
      .catch(error => {
        alert('error updating user ' + error);
      });
  }

  render() {
    const { name, username, password, email, birthday } = this.state;

    return (
      <Container className="profile">
        <Row>
          <Col>
            <h1>{name}</h1>
          </Col>
        </Row>
        <Row>
          <Col className="profile_detail">
            <Tab.Container id="left-tabs-example" defaultActiveKey="first">
              <Row>
                <Col sm={3} className="profile__nav">
                  <Nav variant="pills" className="flex-column">
                    <Nav.Item>
                      <Nav.Link eventKey="first">Profile Information</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="second">Update Profile</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="third">Delete Profile</Nav.Link>
                    </Nav.Item>
                  </Nav>
                </Col>
                <Col sm={9}>
                  <Tab.Content>
                    <Tab.Pane eventKey="first">
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
                    </Tab.Pane>
                    <Tab.Pane eventKey="second">
                      <h3>Edit Profile </h3>

                      <Form>
                        <Form.Group controlId="formName">
                          <Form.Label>Name</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Name"
                            value={this.state.name}
                            onChange={this.handleChange}
                          />
                        </Form.Group>

                        <Form.Group controlId="formPassword">
                          <Form.Label>Password</Form.Label>
                          <Form.Control
                            type="password"
                            placeholder="Password"
                            // value={password}
                            onChange={e => setPassword(e.target.value)}
                          />
                        </Form.Group>
                        <Form.Group controlId="formEmail">
                          <Form.Label>Email</Form.Label>
                          <Form.Control
                            type="email"
                            placeholder="Email Address"
                            value={this.state.email || ''}
                            onChange={e => setEmail(e.target.value)}
                          />
                        </Form.Group>
                        <Form.Group controlId="formDoB">
                          <Form.Label>Date of Birth</Form.Label>
                          <Form.Control
                            type="date"
                            placeholder="Date of Birth"
                            value={this.state.birthday || ''}
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
                    </Tab.Pane>
                    <Tab.Pane eventKey="third">
                      <h3>Delete Profile </h3>
                      <Alert variant="danger">
                        Warning: Clicking on delete will permanently your
                        profile and all your related information!
                      </Alert>

                      <Button variant="danger" onClick={this.deleteProfile}>
                        Delete Profile
                      </Button>
                    </Tab.Pane>
                  </Tab.Content>
                </Col>
              </Row>
            </Tab.Container>
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
