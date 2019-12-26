const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({
    status: 'success',
    results: users.length,
    data: {
      users
    }
  });
});

exports.createUser = catchAsync(async (req, res, next) => {
  const hashedPassword = User.hashedPassword(req.body.password);
  const newUser = await User.create({
    username: req.body.username,
    password: hashedPassword,
    email: req.body.email,
    birthday: req.body.burthday
  });

  res.status(201).json({
    status: 'success',
    data: {
      user: newUser
    }
  });
});

exports.updateUser = catchAsync(async (req, res, next) => {
  const hashedPassword = User.hashedPassword(req.body.password);
  const user = await User.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        username: req.body.username,
        password: hashedPassword,
        email: req.body.email,
        birthday: req.body.birthday
      }
    },
    {
      new: true
    }
  );

  if (!user) {
    return next(new AppError('Could not update user!', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      user
    }
  });
});

exports.deleteUser = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndDelete(req.params.id);

  if (!user) {
    return next(new AppError('Could not delete user!', 404));
  }

  res.status(204).json({
    status: 'success',
    data: null
  });
});

exports.createFavourite = catchAsync(async (req, res, next) => {
  const newFavourite = await User.findOneAndUpdate(
    { _id: req.params.user_id },
    {
      $push: { favoriteMovies: req.params.movie_id }
    },
    { new: true }
  );
  if (!newFavourite) {
    return next(new AppError('Could not add favourite', 404));
  }
  res.status(201).json({
    status: 'success',
    data: {
      user: newFavourite
    }
  });
});

exports.deleteFavourite = catchAsync(async (req, res, next) => {
  const deletedFavourite = await User.findOneAndUpdate(
    { _id: req.params.user_id },
    {
      $pull: { favoriteMovies: req.params.movie_id }
    },
    { new: true }
  );

  if (!deletedFavourite) {
    return next(new AppError('Could not delete movie from favourites', 404));
  }

  res.status(204).json({
    status: 'success',
    data: null
  });
});
