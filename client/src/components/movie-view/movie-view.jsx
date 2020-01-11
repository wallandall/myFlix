import React from 'react';
import PropTypes from 'prop-types';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';

export class MovieView extends React.Component {
  constructor() {
    super();

    this.state = {};
  }

  render() {
    const { movie, onClick } = this.props;

    if (!movie) return null;

    return (
      <Container>
        <Row>
          <Col>
            <h1>{movie.title}</h1>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col className="movie_image " md={4}>
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
              {movie.genre.name}
            </div>
            <div>
              <strong>Creator: </strong>
              {movie.director.name}
            </div>
            <div>
              <strong>Staring: </strong>
              {movie.actors.join(', ')}
            </div>

            <p>{movie.description}</p>
            <Button variant="outline-dark" onClick={() => onClick()}>
              Back
            </Button>
          </Col>
        </Row>
      </Container>
    );
  }
}

MovieView.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    imagePath: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    actors: PropTypes.array.isRequired,
    genre: PropTypes.exact({
      _id: PropTypes.string,
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired
    }),
    director: PropTypes.shape({
      name: PropTypes.string.isRequired
    })
  }).isRequired
};
