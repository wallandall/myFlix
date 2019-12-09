const express = require('express');

const moviesController = require('../controllers/movieController');

const router = express.Router();

router.route('/').get(moviesController.getAllMovies);
router.route('/:title').get(moviesController.getMovieByTitle);
router.route('/genres/:name').get(moviesController.getGenreByName);
router.route('/directors/:name').get(moviesController.getDirectorByName);

module.exports = router;
