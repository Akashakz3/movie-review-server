const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Movie title is required"],
    trim: true
  },
  description: {
    type: String,
    default: ""
  },
  genre: {
    type: [String],
    required: [true, "At least one genre is required"]
  },
  releaseDate: {
    type: Date
  },
  director: {
    type: String,
    trim: true
  },
  cast: {
    type: [String]
  },
  poster: {
    type: String,
    default: ""
  },
  trailer: {
    type: String,
    default: ""
  },
  isPremium: {
    type: Boolean,
    default: false
  },
  averageRating: {
    type: Number,
    default: 0
  },
  views: {
    type: Number,
    default: 0
  },
  likes: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

module.exports = mongoose.model('Movie', movieSchema);