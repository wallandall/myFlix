import React from 'react';
import PropTypes from 'prop-types';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';

import axios from 'axios';

import { Link } from 'react-router-dom';

import './movie-view.scss';

export class MovieView extends React.Component {
  constructor() {
    super();

    this.state = {};
  }

  addToFavorites(e) {
    const { movie } = this.props;
    e.preventDefault();
    axios
      .post(
        `https://my-flix-tracker.herokuapp.com/api/v1/users/${localStorage.getItem(
          'user'
        )}/movies/${movie._id}`,
        { username: localStorage.getItem('user') },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        }
      )
      .then(res => {
        alert(`${movie.title} was successfully added to your favorites`);
      })

      .then(res => {
        document.location.reload(true);
      })
      .catch(error => {
        alert(`${movie.title} not added to your favorites` + error);
      });
  }

  render() {
    const { movie, onClick } = this.props;

    if (!movie) return null;

    return (
      <Container className="movie_detail">
        <Row>
          <Col>
            <h1>{movie.title}</h1>
          </Col>
        </Row>
        <Row>
          <Col className=" movie_image " md={4}>
            <Image
              width={250}
              className="movie-poster"
              src={movie.imagePath}
              rounded
            />
          </Col>
          <Col className="movie_description" md={6}>
            <div>
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
            </Link>

            <Button
              variant="outline-light"
              onClick={e => this.addToFavorites(e)}
            >
              Add to vavourite
            </Button>
          </Col>
        </Row>
      </Container>
    );
  }
}

MovieView.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string,
    ReleaseYear: PropTypes.string,
    imagePath: PropTypes.string,
    description: PropTypes.string,
    genre: PropTypes.shape({
      name: PropTypes.string,
      description: PropTypes.string
    }),
    director: PropTypes.shape({
      name: PropTypes.string,
      bio: PropTypes.string,
      birth: PropTypes.string,
      death: PropTypes.string
    })
  })
};
