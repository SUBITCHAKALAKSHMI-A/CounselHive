const express = require('express');
const router = express.Router();
const { signup, login, getProfile } = require('../controllers/authController');
const { validateSignup, validateLogin } = require('../middleware/validation');
const authenticateToken = require('../middleware/auth');

// Public routes
router.post('/signup', validateSignup, signup);
router.post('/login', validateLogin, login);

// Protected routes
router.get('/profile', authenticateToken, getProfile);

module.exports = router; 