const express = require('express');
const passport = require('passport');
require('../utils/passport');

const usersController = require('../controllers/userController');

const router = express.Router();

router
  .route('/')
  .get(
    passport.authenticate('jwt', { session: false }),
    usersController.getAllUsers
  )
  .post(
    passport.authenticate('jwt', { session: false }),
    usersController.createUser
  );

router
  .route('/:id')
  .put(
    passport.authenticate('jwt', { session: false }),
    usersController.updateUser
  )
  .delete(
    passport.authenticate('jwt', { session: false }),
    usersController.deleteUser
  );

router
  .route('/:user_id/movies/:movie_id')
  .post(
    passport.authenticate('jwt', { session: false }),
    usersController.createFavourite
  )
  .delete(
    passport.authenticate('jwt', { session: false }),
    usersController.deleteFavourite
  );

module.exports = router;
