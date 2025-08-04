const express = require('express');
const router = express.Router();
const { getMovies, getMovieById, createMovie, updateMovie, deleteMovie } = require('../controllers/movieController');
const authMiddleware = require('../middlewares/authMiddleware');

// Admin check middleware
const adminMiddleware = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(403).json({ message: 'Access denied: Admin only' });
  }
};

// Public routes
router.get('/', getMovies);            // GET all movies (public)
router.get('/:id', getMovieById);      // GET single movie (public)

// Protected routes (Admin only)
router.post('/', authMiddleware, adminMiddleware, createMovie);   // Create movie
router.put('/:id', authMiddleware, adminMiddleware, updateMovie); // Update movie
router.delete('/:id', authMiddleware, adminMiddleware, deleteMovie); // Delete movie

module.exports = router;
