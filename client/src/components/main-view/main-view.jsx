import React from 'react';
import axios from 'axios';

import { connect } from 'react-redux';

import { BrowserRouter as Router, Route } from 'react-router-dom';

import { setMovies } from '../../actions/actions';

import Row from 'react-bootstrap/Row';

import MoviesList from '../movies-list/movies-list';
import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import { NavigationView } from '../navigation-view/navigation-view';
import { ProfileView } from '../profile-view/profile-view';

import Nav from 'react-bootstrap/Nav';

import { Link } from 'react-router-dom';

import './main-view.scss';
import { format } from 'morgan';

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
    localStorage.setItem('user', authData.user._id);
    this.getMovies(authData.token);
  }

  onLogout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
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

  getMovies(token) {
    axios
      .get('https://my-flix-tracker.herokuapp.com/api/v1/movies', {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(response => {
        console.log(response.data.data);
        this.props.setMovies(response.data.data.movies);
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
    const { selectedMovie, user } = this.state;
    let { movies } = this.props;
    console.log(movies);

    console.log();
    if (!movies && !user) return <div className="main-view" />;

    if (selectedMovie)
      return (
        <MovieView movie={selectedMovie} onClick={() => this.onBackClick()} />
      );

    return (
      <Router>
        <div className="main-view">
          <NavigationView user={user} onClick={() => this.onLogout()} />
          <Row className="justify-content-center">
            <Route
              exact
              path="/"
              render={() => {
                if (!user)
                  return (
                    <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                  );
                console.log('Movies :' + movies);
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
              if (!movies || movies.length === 0)
                return <div className="main-view" />;
              return (
                <DirectorView
                  director={
                    movies.find(m => m.director.name === match.params.name)
                      .director
                  }
                  movies={movies}
                />
              );
            }}
          />

          <Route
            exact
            path="/genres/:name"
            render={({ match }) => {
              if (!movies || movies.length === 0)
                return <div className="main-view" />;
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

          <Route
            path="/profile/:user"
            render={({ match }) => {
              return <ProfileView user={user} movies={movies} />;
            }}
          />
        </div>
      </Router>
    );
  }
}

let mapStateToProps = state => {
  return { movies: state.movies };
};

export default connect(mapStateToProps, { setMovies })(MainView);
