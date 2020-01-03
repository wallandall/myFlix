import React from "react";
import axios from "axios";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export class MainView extends React.Component {
  constructor() {
    super();

    this.state = {
      movie: null,
      selectedMovie: null
    };
  }

  componentDidMount() {
    //const apiURL = "http://localhost:3000/api/v1/movies";
    const apiURL = "https://my-flix-tracker.herokuapp.com/api/v1/movies";
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

  render() {
    const { movies, selectedMovie } = this.state;

    if (!movies) return <div className="main-view" />;

    return (
      <div className="main-view">
        {selectedMovie ? (
          <MovieView movie={selectedMovie} />
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
