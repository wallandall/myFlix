import React from 'react';
import axios from 'axios';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import { Link } from 'react-router-dom';

import './profile-view.scss';

export class ProfileView extends React.Component {
  constructor() {
    super();
    this.state = {
      profile: []
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
          profile: response.data.data.user
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  render() {
    const { profile } = this.state;

    return (
      <Container className="profile">
        <Row>
          <Col>
            <h1>My Profile</h1>
          </Col>
        </Row>
        <Row>
          <Col className="profile_detail" md={4}>
            <p>Name: {profile.username}</p>
            <p>Email: {profile.email}</p>
            <p>Date of Birth: {profile.birthday}</p>
            <p></p>
          </Col>
          <Col className="profile_edit" md={6}>
            {/* <div>
                        <strong>Genre: </strong>
                        <Link to={`/genres/${movie.genre.name}`}>
                            <Button variant="link">{movie.genre.name}</Button>
                        </Link>
                    </div>
                    <div>
                        <strong>Director: </strong>
                        <Link to={`/directors/${movie.director.name}`}>
                            <Button variant="link">{movie.director.name}</Button>
                        </Link>
                    </div>
                    <div>
                        <strong>Staring: </strong>
                        {movie.actors.join(', ')}
                    </div>
                    <hr />
                    <p>{movie.description}</p>
                    <Link to={`/`}>
                        <Button variant="outline-light">Home</Button>
                    </Link> */}
          </Col>
        </Row>
        <Row>
          <Link to={`/`}>
            <Button variant="outline-light">Home</Button>
          </Link>
        </Row>
      </Container>
    );
  }
}
