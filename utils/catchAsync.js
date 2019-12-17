const mongoose = require('mongoose');

const AppError = require('./appError');

module.exports = fn => {
  return (req, res, next) => {
    if (mongoose.connection.readyState !== 1) {
      next(new AppError('DB Connection Error', 500));
    }
    fn(req, res, next).catch(next);
  };
};

/*
ReadyState
0: disconnected
1: connected
2: connecting
3: disconnecting
*/
