const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, "User ID is required"]
  },
  movie: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Movie',
    required: [true, "Movie ID is required"]
  },
  rating: {
    type: Number,
    required: [true, "Rating is required"],
    min: [0, "Rating must be between 0 and 5"],
    max: [5, "Rating must be between 0 and 5"]
  },
  reviewText: {
    type: String,
    trim: true,
    required: [true, "Review text cannot be empty"]
  }
}, { timestamps: true });

// ✅ Prevent same user posting multiple reviews for the same movie
reviewSchema.index({ user: 1, movie: 1 }, { unique: true });

module.exports = mongoose.model('Review', reviewSchema);