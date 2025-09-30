const express = require('express');
const router = express.Router();
const College = require('../models/College');
const authenticateToken = require('../middleware/auth');

// Get all colleges
router.get('/', async (req, res) => {
  try {
    const colleges = await College.find().select('-__v');
    res.json({
      status: 'ok',
      colleges
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      error: 'Failed to fetch colleges'
    });
  }
});

// Get college by ID
router.get('/:id', async (req, res) => {
  try {
    const college = await College.findById(req.params.id).select('-__v');
    if (!college) {
      return res.status(404).json({
        status: 'error',
        error: 'College not found'
      });
    }
    res.json({
      status: 'ok',
      college
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      error: 'Failed to fetch college'
    });
  }
});

// Search colleges
router.get('/search', async (req, res) => {
  try {
    const { name, location, type, minGpa, maxTuition } = req.query;
    const query = {};

    if (name) {
      query.name = { $regex: name, $options: 'i' };
    }
    if (location) {
      query.location = { $regex: location, $options: 'i' };
    }
    if (type) {
      query.type = type;
    }
    if (minGpa) {
      query['requirements.gpa.min'] = { $lte: parseFloat(minGpa) };
    }
    if (maxTuition) {
      query['tuition.outState'] = { $lte: parseFloat(maxTuition) };
    }

    const colleges = await College.find(query).select('-__v');
    res.json({
      status: 'ok',
      colleges
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      error: 'Failed to search colleges'
    });
  }
});

// Protected route - Get college recommendations
router.get('/recommendations', authenticateToken, async (req, res) => {
  try {
    // This would implement recommendation logic based on user preferences
    // For now, returning top ranked colleges
    const recommendations = await College.find()
      .sort({ ranking: 1 })
      .limit(10)
      .select('-__v');

    res.json({
      status: 'ok',
      recommendations
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      error: 'Failed to get recommendations'
    });
  }
});

module.exports = router; 