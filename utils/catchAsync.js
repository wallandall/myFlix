const mongoose = require('mongoose');

const AppError = require('./appError');

module.exports = fn => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};
// const getBDStatus = () => {
//   const dbStatus = mongoose.connection.readyState;
//   console.log(dbStatus);

//   if (dbStatus !== 1) {
//     return new AppError('DB Connection Error', 500);
//   }
// };

// module.exports = fn => {
//   return getBDStatus();
//   () => {
//     return (req, res, next) => {
//       fn(req, res, next).catch(next);
//     };
//   };
// };
// //

/*readyState
0: disconnected
1: connected
2: connecting
3: disconnecting

const dbStatus = mongoose.connection.readyState;
  console.log(dbStatus);
  if (dbStatus !== 1) {
    console.log('DB Error ' + dbStatus);
    return new AppError(`DB Connection Error`, 500);
  }

  module.exports = async fn => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};

*/
