import React from 'react';
import PropTypes from 'prop-types';

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

import { Link } from 'react-router-dom';

import './navigation-view.scss';

export class NavigationView extends React.Component {
  constructor() {
    super();

    this.state = {};
  }
  render() {
    const { user, onClick } = this.props;

    if (!user) return <div className="main-view" />;
    return (
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand>
          <Link to={`/`} className="my-flix">
            MyFlix
          </Link>
        </Navbar.Brand>

        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            <Link to={`/profile/${user}`}>My Profile</Link>{' '}
          </Navbar.Text>
          <Nav.Link onClick={() => onClick()} className="logout">
            Logout
          </Nav.Link>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

NavigationView.propTypes = {
  user: PropTypes.string
};
