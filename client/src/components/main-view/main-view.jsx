import React from 'react';
import axios from 'axios';

import Row from 'react-bootstrap/Row';

import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

import './main-view.scss';

export class MainView extends React.Component {
  constructor() {
    super();

    this.state = {
      movies: null,
      selectedMovie: null,
      user: null,
      newUser: false
    };
  }

  componentDidMount() {
    //const apiURL = "http://localhost:3000/api/v1/movies";
    const apiURL = 'https://my-flix-tracker.herokuapp.com/api/v1/movies';
    axios
      .get(apiURL)
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
    this.gtMovies(authData.token);
  }

  onUserRegistered(user) {
    this.setState({
      user,
      newUser: null
    });
  }

  getMovies(toekn) {
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

  newUser() {
    this.setState({
      newUser: true
    });
  }

  render() {
    const { movies, selectedMovie, user, newUser } = this.state;

    if (!user && newUser === false)
      return (
        <LoginView
          onClick={() => this.newUser()}
          onLoggedIn={user => this.onLoggedIn(user)}
        />
      );

    if (newUser)
      return (
        <RegistrationView
          onUserRegistered={user => this.onUserRegistered(user)}
        />
      );

    if (!movies) return <div className="main-view" />;

    if (selectedMovie)
      return (
        <MovieView movie={selectedMovie} onClick={() => this.onBackClick()} />
      );

    return (
      <Row className="justify-content-center">
        {movies.data.movies.map(movie => (
          <MovieCard
            key={movie._id}
            movie={movie}
            onClick={this.onMovieClick(movie)}
          />
        ))}
      </Row>
    );
  }
}
