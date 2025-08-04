const express = require('express');
const router = express.Router();
const { getReviews, addReview, updateReview, deleteReview } = require('../controllers/reviewController');
const authMiddleware = require('../middlewares/authMiddleware');

// Public route - anyone can see reviews
router.get('/', getReviews);

//  Protected route - login required to add review
router.post('/', authMiddleware, addReview);

// Protected route - login required to update review
router.put('/:id', authMiddleware, updateReview);

// Protected route - login required to delete review
router.delete('/:id', authMiddleware, deleteReview);

module.exports = router;

