const Review = require('../models/reviewModel');

//  GET all reviews
const getReviews = async (req, res) => {
  try {
    const reviews = await Review.find().populate('user', 'username email').populate('movie', 'title');
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//  POST add review
const addReview = async (req, res) => {
  try {
    const { movie, rating, reviewText } = req.body;

    // 🔍 Check movie id & rating
    if (!movie) return res.status(400).json({ message: 'Movie ID is required' });
    if (!rating) return res.status(400).json({ message: 'Rating is required' });

    //  Create review (user token ninn set cheyyunnu)
    const review = new Review({
      user: req.user._id,  // token ninn edukkunath
      movie,
      rating,
      reviewText
    });

    const savedReview = await review.save();
    res.status(201).json(savedReview);

  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({ message: 'You have already reviewed this movie' });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
};

//  PUT update review
const updateReview = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Review.findByIdAndUpdate(id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'Review not found' });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//  DELETE review
const deleteReview = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Review.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: 'Review not found' });
    res.json({ message: 'Review deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getReviews, addReview, updateReview, deleteReview };

