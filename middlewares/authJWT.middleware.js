const jwt = require('jsonwebtoken');
const config = require('../config/auth.config');

const verifyToken = (req, res, next) => {
  let token = req.headers['x-access-token'];
  console.log({
    token
  })
  if (!token) {
    return res.status(403).json({
      status: 'error',
      message: 'You cannot access this resource'
    });
  }
  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        status: 'error',
        message: err
      });
    }
    console.log({
      decoded
    });
    req.userId = decoded.id;
    next();
  })
}

module.exports = {
  verifyToken
};