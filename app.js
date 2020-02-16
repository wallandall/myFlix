const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const movieRouter = require('./routes/movieRoutes');
const userRouter = require('./routes/userRoutes');
const authRouter = require('./routes/authRoutes');

const app = express();
app.use(cors());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.static('public'));

// app.get('/', (req, res) => {
//   res.send('myFlix API');
// });

app.use('/client', express.static(path.join(__dirname, 'client', 'dist')));
app.get('/client/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/dist', 'index.html'));
});
app.use('/api/v1/movies', movieRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/', authRouter);

app.get('/documentation', (req, res) => {
  res.sendFile('/public/documentation.html', { root: __dirname });
});

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find the path: ${req.originalUrl}`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
