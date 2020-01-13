import React from 'react';
import PropTypes from 'prop-types';

import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';

export class NavigationView extends React.Component {
  render() {
    const { movie, user, onClick } = this.props;

    return (
      <div className="navigation-view">
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Navbar.Brand href="#home">MyFlix</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="#">Movies</Nav.Link>
              <Nav.Link href="#">Genres</Nav.Link>
            </Nav>
            <Nav className="justify-content-end">
              <NavDropdown title="{user}" id="collasible-nav-dropdown">
                <NavDropdown.Item href="#">My Profile</NavDropdown.Item>
                <NavDropdown.Item href="#">{user}</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#">Logout</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}

NavigationView.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string,
    email: PropTypes.string.isRequired
  })
};
