import React from 'react';
import PropTypes from 'prop-types';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Carousel from 'react-bootstrap/Carousel';

import { Link } from 'react-router-dom';

import './director-view.scss';

export class DirectorView extends React.Component {
  constructor() {
    super();

    this.state = {};
  }

  render() {
    const { director, movies } = this.props;
    console.log(movies);
    if (!director) return null;
    const name = director.name;
    const bio = director.bio;
    const birth = director.birth;
    let death = director.death;
    if (death === '') death = '-';

    return (
      <Container className="director_detail">
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
          <Col className="director_bio" md={6}>
            <p>{bio}</p>
          </Col>
        </Row>
        <Row>
          <h1>Movies by {name}</h1>
        </Row>
        <Row>
          {/* <Carousel> */}
          {movies.map(m => {
            if (m.director.name === director.name) {
              return (
                <div key={m._id}>
                  {/* <Carousel.Item>
                      <img
                        className="d-block w-100"
                        src="{m.imagePath}"
                        alt="{m.title}"
                      />
                      <Carousel.Caption>
                        <h3>{m.title}</h3>
                        <p>
                          Nulla vitae elit libero, a pharetra augue mollis
                          interdum.
                        </p>
                      </Carousel.Caption>
                    </Carousel.Item> */}
                  {m.title} {m.imagePath}
                </div>
              );
            }
          })}
          {/* </Carousel> */}
        </Row>
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
