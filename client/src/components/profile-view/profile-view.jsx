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

import { Link } from 'react-router-dom';

import './profile-view.scss';

export class ProfileView extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      username: '',
      password: '',
      email: '',
      birthday: '',
      favourites: [],
      movies: []
    };

    this.handleChange = this.handleChange.bind(this);
    this.updateProfile = this.updateProfile.bind(this);
  }

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.getProfile(accessToken);
    }
  }

  getProfile() {
    let id = localStorage.getItem('user');
    let token = localStorage.getItem('token');

    axios
      .get(`https://my-flix-tracker.herokuapp.com/api/v1/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(response => {
        this.setState({
          name: response.data.data.user.name,
          username: response.data.data.user.username,
          password: response.data.data.user.password,
          email: response.data.data.user.email,
          birthday: response.data.data.user.birthday.substring(0, 10),
          favourites: response.data.data.user.favoriteMovies
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  deleteProfile() {
    let id = localStorage.getItem('user');
    let token = localStorage.getItem('token');
    axios
      .delete(`https://my-flix-tracker.herokuapp.com/api/v1/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
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

  handleChange(key) {
    return function(e) {
      var state = {};
      state[key] = e.target.value;
      this.setState(state);
    }.bind(this);
  }

  updateProfile(event) {
    let id = localStorage.getItem('user');
    let token = localStorage.getItem('token');

    event.preventDefault();

    axios
      .put(
        `https://my-flix-tracker.herokuapp.com/api/v1/users/${id}`,
        {
          name: this.state.name,
          username: this.state.username,
          password: this.state.password,
          email: this.state.email,
          birthday: this.state.birthday
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      )
      .then(response => {
        const data = response.data;

        document.location.reload(true);
      })
      .catch(event => {
        alert('Could not edit profile. Error: ' + event);
      });
  }

  deleteFavorite(movieId) {
    axios
      .delete(
        `https://my-flix-tracker.herokuapp.com/api/v1/users/${localStorage.getItem(
          'user'
        )}/movies/${movieId}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        }
      )
      .then(res => {
        document.location.reload(true);
      })
      .then(res => {
        alert('Movie successfully deleted from your favorites');
      })

      .catch(e => {
        alert('Movie could not be deleted from your favorites ' + e);
      });
  }
  render() {
    const {
      name,
      username,
      password,
      email,
      birthday,
      favourites
    } = this.state;

    const { movie, userProfile } = this.props;
    const favoriteList = this.props.movies.filter(m =>
      this.state.favourites.includes(m._id)
    );

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
                      <Nav.Link eventKey="third">Favourite Movies</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="fourth">Delete Profile</Nav.Link>
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
                            onChange={this.handleChange('name')}
                          />
                        </Form.Group>

                        <Form.Group controlId="formUserName">
                          <Form.Label>Username</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Username"
                            readOnly={true}
                            disabled={true}
                            value={this.state.username}
                            onChange={this.handleChange}
                          />
                        </Form.Group>

                        <Form.Group controlId="formPassword">
                          <Form.Label>Password</Form.Label>
                          <Form.Control
                            type="password"
                            placeholder="Password"
                            onChange={this.handleChange('password')}
                          />
                        </Form.Group>
                        <Form.Group controlId="formEmail">
                          <Form.Label>Email</Form.Label>
                          <Form.Control
                            type="email"
                            placeholder="Email Address"
                            value={this.state.email}
                            onChange={this.handleChange('email')}
                          />
                        </Form.Group>
                        <Form.Group controlId="formDoB">
                          <Form.Label>Date of Birth</Form.Label>
                          <Form.Control
                            type="date"
                            placeholder="Date of Birth"
                            value={this.state.birthday}
                            onChange={this.handleChange('birthday')}
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
                      <h3>Favourite Movies</h3>

                      {favoriteList.map(m => (
                        <div key={m._id} className="fav-movies-button">
                          <Button
                            variant="outline-light"
                            onClick={e => this.deleteFavorite(m._id)}
                          >
                            Remove Favorite
                          </Button>
                          <Link to={`/movies/${m._id}`}>
                            <Button variant="link">{m.title}</Button>
                          </Link>
                        </div>
                      ))}
                    </Tab.Pane>
                    <Tab.Pane eventKey="fourth">
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
      </Container>
    );
  }
}
