import React from 'react';
import { connect } from 'react-redux';

import VisibilityFilterInput from '../visibility-filter-input/visibility-filter-input';
import { MovieCard } from '../movie-card/movie-card';

import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
const mapStateToProps = state => {
  const { visibilityFilter } = state;
  return { visibilityFilter };
};

function MoviesList(props) {
  const { movies, visibilityFilter } = props;
  let filteredMovies = movies;

  if (visibilityFilter !== '') {
    filteredMovies = movies.filter(m =>
      m.title.toLowerCase().includes(visibilityFilter.toLowerCase())
    );
  }

  if (!movies) return <div className="main-view" />;

  return (
    <div className="movies-list">
      <Row className="justify-content-center">
        <VisibilityFilterInput visibilityFilter={visibilityFilter} />

        {filteredMovies.map(m => (
          <MovieCard key={m._id} movie={m} />
        ))}
      </Row>
    </div>
  );
}

export default connect(mapStateToProps)(MoviesList);
