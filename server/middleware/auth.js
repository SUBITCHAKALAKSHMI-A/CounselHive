const { verifyToken } = require('../config/auth');

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({ 
      status: 'error', 
      error: 'Access token required' 
    });
  }

  const decoded = verifyToken(token);
  if (!decoded) {
    return res.status(403).json({ 
      status: 'error', 
      error: 'Invalid or expired token' 
    });
  }

  req.userId = decoded.userId;
  next();
};

module.exports = authenticateToken; 