const express = require('express');
const router = express.Router();
const { getReviews, addReview, updateReview, deleteReview, getReviewsByMovie, getUserReviews } = require('../controllers/reviewController');
const authMiddleware = require('../middlewares/authMiddleware');

// Public route - anyone can see reviews
router.get('/', getReviews);

// GET /api/reviews/movie/:movieId
router.get('/movie/:movieId', getReviewsByMovie);

router.get('/user/:userId', getUserReviews);

//  Protected route - login required to add review
router.post('/', authMiddleware, addReview);

// Protected route - login required to update review
router.put('/:id', authMiddleware, updateReview);

// Protected route - login required to delete review
router.delete('/:id', authMiddleware, deleteReview);

module.exports = router;

