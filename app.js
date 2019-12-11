const express = require('express');
const morgan = require('morgan');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const movieRouter = require('./routes/movieRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.send('myFlix API');
});

app.use('/api/v1/movies', movieRouter);
app.use('/api/v1/users', userRouter);

app.get('/documentation', (req, res) => {
  res.sendFile('/public/documentation.html', { root: __dirname });
});

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find the path: ${req.originalUrl}`, 404));
});

app.use(globalErrorHandler);

module.exports = app;