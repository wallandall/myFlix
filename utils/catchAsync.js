const mongoose = require('mongoose');

const AppError = require('./appError');

module.exports = fn => {
  return (req, res, next) => {
    fn(req, res, next)
      .then(() => {
        if (mongoose.connection.readyState !== 1) {
          console.log('error - DB Disconnected');
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
