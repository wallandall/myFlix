import React from 'react';
import PropTypes from 'prop-types';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';

import { Link } from 'react-router-dom';

import './movie-view.scss';

export class MovieView extends React.Component {
  constructor() {
    super();

    this.state = {};
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
          </Col>
        </Row>
      </Container>
    );
  }
}
