const Movie = require('../models/movieModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.getAllMovies = catchAsync(async (req, res, next) => {
  const movies = await Movie.find();

  res.status(200).json({
    status: 'success',
    results: movies.length,
    data: {
      movies
    }
  });
});

exports.getMovieByTitle = catchAsync(async (req, res, next) => {
  const movies = await Movie.findOne({ title: req.params.title });
  if (!movies) {
    return next(
      new AppError(`Movie: ${req.params.title}, could not be found`, 404)
    );
  }
  res.status(200).json({
    status: 'success',
    results: movies.length,
    data: {
      movies
    }
  });
});

exports.getGenreByName = catchAsync(async (req, res, next) => {
  const movies = await Movie.findOne({ 'genre.name': req.params.name });
  if (!movies) {
    return next(
      new AppError(`Genre: ${req.params.name}, could not be found!`, 404)
    );
  }
  res.status(200).json({
    status: 'success',
    data: {
      genre: movies.genre
    }
  });
});

exports.getDirectorByName = catchAsync(async (req, res, next) => {
  const movies = await Movie.findOne({ 'director.name': req.params.name });
  if (!movies) {
    return next(
      new AppError(`Director: ${req.params.name}, could not be found!`, 404)
    );
  }
  res.status(200).json({
    status: 'success',
    data: {
      director: movies.director
    }
  });
});
