import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

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

  onMovieClick(movie) {
    this.setState({
      selectedMovie: movie
    });
  }

  onBackClick() {
    this.setState({
      selectedMovie: null
    });
  }

  onLoggedIn(user) {
    this.setState({
      user
    });
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

    return (
      <div className="main-view">
        {selectedMovie ? (
          <MovieView movie={selectedMovie} onClick={() => this.onBackClick()} />
        ) : (
          movies.data.movies.map(movie => (
            <MovieCard
              key={movie._id}
              movie={movie}
              onClick={movie => this.onMovieClick(movie)}
            />
          ))
        )}
      </div>
    );
  }
}