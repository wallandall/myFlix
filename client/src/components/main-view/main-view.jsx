import React from 'react';
import axios from 'axios';

import { BrowserRouter as Router, Route } from 'react-router-dom';

import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';

import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { DirectorView } from '../director-view/director-view';

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

  onUserRegistered(user) {
    this.setState({
      user,
      newUser: null
    });
  }

  getMovies(token) {
    axios
      .get('https://my-flix-tracker.herokuapp.com/api/v1/movies', {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(response => {
        this.setState({
          movies: response.data.data.movies
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  newUser() {
    this.setState({
      newUser: true
    });
  }

  render() {
    const { movies, selectedMovie, user } = this.state;

    if (!movies) return <div className="main-view" />;

    if (selectedMovie)
      return (
        <MovieView movie={selectedMovie} onClick={() => this.onBackClick()} />
      );

    return (
      <Router>
        <div className="main-view">
          <Row className="justify-content-center">
            <Route
              exact
              path="/"
              render={() => {
                if (!user)
                  return (
                    <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                  );

                return movies.map(m => <MovieCard key={m._id} movie={m} />);
              }}
            />
          </Row>

          <Route path="/register" render={() => <RegistrationView />} />
          <Route
            path="/movies/:movieId"
            render={({ match }) => (
              <MovieView
                movie={movies.find(m => m._id === match.params.movieId)}
              />
            )}
          />
          <Route
            exact
            path="/directors/:name"
            render={({ match }) => {
              if (!movies) return <div className="main-view" />;
              return (
                <DirectorView
                  director={
                    movies.find(m => m.director.name === match.params.name)
                      .director
                  }
                />
              );
            }}
          />

          <Route
            exact
            path="/genres/:name"
            render={({ match }) => {
              if (!movies) return <div className="main-view" />;
              return (
                <GenreView
                  genre={
                    movies.find(m => m.genre.name === match.params.name).genre
                  }
                  movies={movies}
                />
              );
            }}
          />
        </div>
      </Router>
    );
  }
}
