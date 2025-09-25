const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validatePassword = (password) => {
  return password.length >= 6;
};

const validateSignup = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      status: 'error',
      error: 'Email and password are required'
    });
  }

  if (!validateEmail(email)) {
    return res.status(400).json({
      status: 'error',
      error: 'Please enter a valid email address'
    });
  }

  if (!validatePassword(password)) {
    return res.status(400).json({
      status: 'error',
      error: 'Password must be at least 6 characters long'
    });
  }



  next();
};

const validateLogin = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      status: 'error',
      error: 'Email and password are required'
    });
  }

  if (!validateEmail(email)) {
    return res.status(400).json({
      status: 'error',
      error: 'Please enter a valid email address'
    });
  }

  next();
};

module.exports = {
  validateSignup,
  validateLogin,
  validateEmail,
  validatePassword
}; 