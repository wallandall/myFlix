const express = require('express');

const usersController = require('../controllers/userController');

const router = express.Router();

router
  .route('/')
  .get(usersController.getAllUsers)
  .post(usersController.createUser);

router
  .route('/:id')
  .put(usersController.updateUser)
  .delete(usersController.deleteUser);

router
  .route('/:user_id/movies/:movie_id')
  .post(usersController.createFavourite)
  .delete(usersController.deleteFavourite);

module.exports = router;
