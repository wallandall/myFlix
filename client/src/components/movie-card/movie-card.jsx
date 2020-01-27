import React from 'react';
import PropTypes from 'prop-types';

import Card from 'react-bootstrap/Card';

import { Link } from 'react-router-dom';

import './movie-card.scss';

export class MovieCard extends React.Component {
  render() {
    const { movie } = this.props;

    return (
      <div className="movie-card">
        <Link to={`/movies/${movie._id}`}>
          <Card>
            <Card.Img variant="top" src={movie.imagePath} />

            <div className="movie-card__text">{movie.title}</div>
          </Card>
        </Link>
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
