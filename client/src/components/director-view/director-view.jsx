import React from 'react';
import PropTypes from 'prop-types';

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

    const productions = movies.map(m => {
      if (m.director.name === name)
        return (
          <Col className="production" xs={12} md={4} key={m._id}>
            <Link to={`/movies/${m._id}`}>
              <Image src={m.imagePath} thumbnail />

              <div className="production__text">
                <h3>{m.title}</h3>
              </div>
            </Link>
            <hr className="production__hr" />
          </Col>
        );
    });

    return (
      <Container className="director_detail">
        <Row>
          <h1>{name}</h1>
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
          <Col className="director_bio" md={6}>
            <p>{bio}</p>
          </Col>
        </Row>
        <Row>
          <h1>Movies by {name}</h1>
        </Row>
        <Row className="justify-content-center">{productions}</Row>
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
