import React from 'react';
import PropTypes from 'prop-types';

import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

export class MovieCard extends React.Component {
  render() {
    const { movie, onClick } = this.props;

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
              <Button variant="link" onClick={() => onClick()}>
                View
              </Button>
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
  }).isRequired,
  onClick: PropTypes.func.isRequired
};
