const express = require('express');
const passport = require('passport');

const { userValidationRules, validate } = require('./../utils/validate');

require('../utils/passport');

const usersController = require('../controllers/userController');

const router = express.Router();

router
  .route('/')
  .get(
    passport.authenticate('jwt', { session: false }),
    usersController.getAllUsers
  )
  .post(userValidationRules(), validate, usersController.createUser);

router
  .route('/:id')
  .get(
    passport.authenticate('jwt', { session: false }),
    usersController.getUser
  )
  .put(
    passport.authenticate('jwt', { session: false }),
    userValidationRules(),
    validate,
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
