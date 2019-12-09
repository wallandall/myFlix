const mongoose = require('mongoose');

const movieSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  genre: {
    name: String,
    description: String
  },
  director: {
    name: String,
    bio: String
  },
  actors: [String],
  imagePath: String,
  featured: Boolean
});

const Movie = mongoose.model('Movie', movieSchema);
module.exports = Movie;
