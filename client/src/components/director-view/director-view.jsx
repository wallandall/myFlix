import React from 'react';
import PropTypes from 'prop-types';

import { MovieCard } from '../movie-card/movie-card';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';

import { Link } from 'react-router-dom';

import './director-view.scss';

export class DirectorView extends React.Component {
  constructor() {
    super();

    this.state = {};
  }

  render() {
    const { director, movies } = this.props;

    if (!director) return null;
    const name = director.name;
    const bio = director.bio;
    const birth = director.birth;
    let death = director.death;
    if (death === '') death = '-';

    let productions = movies.map(m => {
      if (m.director.name === name) return <MovieCard key={m._id} movie={m} />;
    });

    return (
      <Container className="justify-content-center">
        <Row>
          <Col>
            <h1>{name}</h1>
          </Col>
        </Row>
        <Row>
          <Col className="director_info " md={4}>
            <div>
              <strong>Birth: </strong>
              {birth}
            </div>
            <div>
              <strong>Death: </strong>
              {death}
            </div>
            <hr />

            <Link to={`/`}>
              <Button variant="outline-light">Home</Button>
            </Link>
          </Col>
          <Col className="director_bio" md={4}>
            <p>{bio}</p>
          </Col>
        </Row>
        <Row>
          <Col>
            <h1>Movies by {name}</h1>
          </Col>
        </Row>
        <Row>{productions}</Row>
      </Container>
    );
  }
}

DirectorView.propTypes = {
  director: PropTypes.shape({
    name: PropTypes.string,
    bio: PropTypes.string,
    birth: PropTypes.string,
    death: PropTypes.string
  })
};
