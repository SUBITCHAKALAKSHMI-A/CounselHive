const express = require('express');
const router = express.Router();

const authRoutes = require('./auth');
const collegeRoutes = require('./college');

// Mount routes
router.use('/auth', authRoutes);
router.use('/colleges', collegeRoutes);

// Health check endpoint
router.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'Server is running',
    timestamp: new Date().toISOString()
  });
});

module.exports = router; 