const db = require('../models');
const User = db.user;

const checkDuplicateUsernameOrEmail = async (req, res, next) => {
  const {
    username
  } = req.body;
  User.findOne({username})
  .exec((err, user) => {
    if (err) {
      res.status(500).json({
        status: 'error',
        message: err
      });
      return;
    }
    if (user) {
      res.status(400).json({
        status: 'error',
        message: 'Username already exists'
      });
      return;
    }
    next();
  })
}

module.exports = {
  checkDuplicateUsernameOrEmail
};