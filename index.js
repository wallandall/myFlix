const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Models = require('./models');

const app = express();

const Movies = Models.Movie;
const Users = Models.User;

mongoose.connect('mongodb://localhost:27017/myFlixDB', {
  useNewUrlParser: true
});

const PORT = process.env.PORT || 8080;

app.use(morgan('common'));
app.use(express.static('public'));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('myFlix API');
});

app.get('/movies', (req, res) => {
  Movies.find()
    .then(movies => {
      res.status(201).json(movies);
    })
    .catch(error => {
      res.status(500).send(`Error: ${error}`);
    });
});

app.get('/movies/:Title', (req, res) => {
  Movies.findOne({ Title: req.params.Title })
    .then(movie => {
      res.json(movie);
    })
    .catch(error => {
      res.status(500).send(`Error: ${error}`);
    });
});

app.get('/movies/genres/:Name', (req, res) => {
  Movies.findOne({ 'Genre.Name': req.params.Name })
    .then(movies => {
      res.json(movies.Genre);
    })
    .catch(error => {
      res.status(500).send(`Error: ${error}`);
    });
});

app.get('/movies/directors/:Name', (req, res) => {
  Movies.findOne({ 'Director.Name': req.params.Name })
    .then(movies => {
      res.json(movies.Director);
    })
    .catch(error => {
      res.status(500).send(`Error: ${error}`);
    });
});

app.get('/users', (req, res) => {
  Users.find()
    .then(users => {
      res.status(201).json(users);
    })
    .catch(error => {
      res.status(500).send(`Error: ${error}`);
    });
});

app.post('/users', (req, res) => {
  Users.findOne({ Username: req.body.Username })
    .then(user => {
      if (user) {
        return res.status(400).send(`${req.body.Username} already exists!`);
      }
      Users.create({
        Username: req.body.Username,
        Password: req.body.Password,
        Email: req.body.Email,
        Birthday: req.body.Birthday
      })
        .then(user => {
          res.status(201).json(user);
        })
        .catch(error => {
          res.status(500).send(`Error: ${error}`);
        });
    })
    .catch(error => {
      res.status(500).send(`Error: ${error}`);
    });
});

app.post('/users/:Username/Movies/:MovieID', (req, res) => {
  Users.findOneAndUpdate(
    { Username: req.params.Username },
    {
      $push: { FavoriteMovies: req.params.MovieID }
    },
    { new: true },
    (error, updatedUser) => {
      if (error) {
        res.status(500).send(`Error: ${error}`);
      } else {
        res.json(updatedUser);
      }
    }
  );
});

app.delete('/users/:Username/Movies/:MovieID', (req, res) => {
  Users.findOneAndUpdate(
    { Username: req.params.Username },
    {
      $pull: { FavoriteMovies: req.params.MovieID }
    },
    { new: true },
    (error, updatedUser) => {
      if (error) {
        res.status(500).send(`Error: ${error}`);
      } else {
        res.json(updatedUser);
      }
    }
  );
});

app.delete('/users/:Username', (req, res) => {
  Users.findOneAndRemove({ Username: req.params.Username })
    .then(user => {
      if (!user) {
        res.status(400).send(`${req.params.Username} was not found!`);
      } else {
        res.status(200).send(`${req.params.Username} was deleted!`);
      }
    })
    .catch(err => {
      res.status(500).send(`Error: ${err}`);
    });
});

app.get('/documentation', (req, res) => {
  res.sendFile('/public/documentation.html', { root: __dirname });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
