const express = require('express');
const passport = require('passport');
require('../utils/passport');

const moviesController = require('../controllers/movieController');
// const authController = require('./../controllers/authController');

const router = express.Router();

router
  .route('/')
  .get(
    passport.authenticate('jwt', { session: false }),
    moviesController.getAllMovies
  );
router
  .route('/:title')
  .get(
    passport.authenticate('jwt', { session: false }),
    moviesController.getMovieByTitle
  );
router
  .route('/genres/:name')
  .get(
    passport.authenticate('jwt', { session: false }),
    moviesController.getGenreByName
  );
router
  .route('/directors/:name')
  .get(
    passport.authenticate('jwt', { session: false }),
    moviesController.getDirectorByName
  );

module.exports = router;
