import React from 'react';
import PropTypes from 'prop-types';

import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import { Link } from 'react-router-dom';

import './movie-card.scss';

export class MovieCard extends React.Component {
  render() {
    const { movie } = this.props;

    return (
      <div className="movie-card">
        <Col xs={12} sm={6} md={4}>
          <Card>
            <Card.Img variant="top" src={movie.imagePath} />
            <Card.Body>
              <Card.Title>{movie.title}</Card.Title>
              <Card.Text>{`${movie.description.substring(
                0,
                125
              )}...`}</Card.Text>
            </Card.Body>
            <Card.Footer>
              <Link to={`/movies/${movie._id}`}>
                <Button variant="link">View</Button>
              </Link>
            </Card.Footer>
          </Card>
        </Col>
      </div>
    );
  }
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string.isRequired,
    imagePath: PropTypes.string.isRequired
  }).isRequired
};
