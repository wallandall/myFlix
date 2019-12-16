const mongoose = require('mongoose');

const AppError = require('./appError');

module.exports = fn => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next))
      .the(() => {
        if (mongoose.connection.readyState !== 1) {
          return new AppError('DB Connection Error', 500);
        }
      })
      .catch(next);
  };
};

/*readyState
0: disconnected
1: connected
2: connecting
3: disconnecting


*/
