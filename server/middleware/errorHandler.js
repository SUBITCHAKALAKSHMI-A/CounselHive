const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  if (err.name === 'ValidationError') {
    return res.status(400).json({
      status: 'error',
      error: 'Validation Error',
      details: err.message
    });
  }

  if (err.name === 'MongoError' && err.code === 11000) {
    return res.status(400).json({
      status: 'error',
      error: 'Duplicate field value'
    });
  }

  res.status(500).json({
    status: 'error',
    error: 'Internal Server Error'
  });
};

module.exports = errorHandler; 