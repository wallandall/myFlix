import React from 'react';
import PropTypes from 'prop-types';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';

import { Link } from 'react-router-dom';

import './director-view.scss';

export class DirectorView extends React.Component {
  constructor() {
    super();

    this.state = {};
  }

  render() {
    const { director } = this.props;

    if (!director) return null;

    return (
      <Container className="director_detail">
        <Row>
          <h1 className="display-4">test</h1>
        </Row>
      </Container>
    );
  }
}

// DirectorView.propTypes = {
//   director: PropTypes.shape({
//     name: PropTypes.string,
//     bio: PropTypes.string,
//     birth: PropTypes.string,
//     death: PropTypes.string
//   })
// };
