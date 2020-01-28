import React from 'react';
import PropTypes from 'prop-types';

import { MovieCard } from '../movie-card/movie-card';

import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import Button from 'react-bootstrap/Button';

import { Link } from 'react-router-dom';

import './genre-view.scss';

export class GenreView extends React.Component {
  constructor() {
    super();

    this.state = {};
  }

  render() {
    const { genre, movies } = this.props;

    const genreMovie = movies.map(m => {
      if (m.genre.name === genre.name)
        return <MovieCard key={m._id} movie={m} />;
    });

    if (!genre) return null;

    return (
      <Container className="justify-content-center ">
        <Row>
          <Col>
            <h1 className="display-4">{genre.name}</h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <p>{genre.description}</p>
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
            <h1 className="display-4">{genre.name} movies</h1>
          </Col>
        </Row>
        <Row>{genreMovie}</Row>
      </Container>
    );
  }
}

GenreView.propTypes = {
  genre: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired
  }).isRequired
};
