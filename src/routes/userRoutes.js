const express = require('express');
const router = express.Router();
const { getUsers, getUserById, registerUser, loginUser, updateUser, deleteUser } = require('../controllers/userController');

// Routes
router.get('/', getUsers);             
// GET all users

router.get('/:id', getUserById);       
// GET single user

router.post('/register', registerUser);        
// POST register user

router.post('/login', loginUser);
// POST login user

router.put('/:id', updateUser);        
// PUT update user

router.delete('/:id', deleteUser);     
// DELETE user

module.exports = router;
