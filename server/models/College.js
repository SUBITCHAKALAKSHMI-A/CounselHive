const mongoose = require('mongoose');

const CollegeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  location: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['Public', 'Private', 'Community'],
    required: true
  },
  acceptanceRate: {
    type: Number,
    min: 0,
    max: 100
  },
  tuition: {
    inState: Number,
    outState: Number
  },
  programs: [{
    name: String,
    degree: {
      type: String,
      enum: ['Associate', 'Bachelor', 'Master', 'Doctorate']
    },
    duration: Number // in years
  }],
  requirements: {
    gpa: {
      min: Number,
      recommended: Number
    },
    sat: {
      min: Number,
      recommended: Number
    },
    act: {
      min: Number,
      recommended: Number
    }
  },
  ranking: Number,
  website: String,
  description: String,
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt field before saving
CollegeSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('College', CollegeSchema); 