import React from 'react';
import axios from 'axios';

import { BrowserRouter as Router, Route } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';

import './main-view.scss';

export class MainView extends React.Component {
  constructor() {
    super();

    this.state = {
      movies: [],
      selectedMovie: null,
      user: null,
      newUser: false
    };
  }

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user')
      });
      this.getMovies(accessToken);
    }
  }

  getMovies(token) {
    axios
      .get('https://my-flix-tracker.herokuapp.com/api/v1/movies', {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(response => {
        this.setState({
          movies: response.data
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  onMovieClick = movie => e => {
    this.setState({
      selectedMovie: movie
    });
  };

  onBackClick() {
    this.setState({
      selectedMovie: null
    });
  }

  onLoggedIn(authData) {
    this.setState({
      user: authData.user.username
    });
    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.username);
    this.getMovies(authData.token);
  }

  onLogout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('movies');
    this.setState({
      user: null
    });
    window.open('/', '_self');
  }

  onUserRegistered(user) {
    this.setState({
      user,
      newUser: null
    });
  }

  newUser() {
    this.setState({
      newUser: true
    });
  }

  render() {
    const { movies, selectedMovie, user, newUser } = this.state;

    if (!movies) return <div className="main-view" />;

    return (
      <Router>
        <Container>
          <Row>
            <Route
              exact
              path="/"
              render={() => {
                if (!user)
                  return (
                    <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                  );
                return movies.data.movies.map(m => (
                  <MovieCard key={m._id} movie={m} />
                ));
              }}
            />
            <Route path="/register" render={() => <RegistrationView />} />
            <Route
              exact
              path="/movies/:movieId"
              render={({ match }) => (
                <MovieView
                  movie={movies.data.movies.find(
                    m => m._id === match.params.movieId
                  )}
                />
              )}
            />
            {/* <Route exact path="/genres/:name" render={<GenreView />} />
            <Route exact path="/directors/:name" render={<DirectorView />} /> */}
          </Row>
        </Container>
      </Router>
    );
  }
}
