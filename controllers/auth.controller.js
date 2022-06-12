const config = require('../config/auth.config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../models');
const User = db.user;

const signup = (req, res) => {
  const {
    username,
    password,
    confirmPassword,
  } = req.body;
  if (password !== confirmPassword) {
    return res.status(400).json({
      status: 'error',
      message: 'Passwords do not match'
    });
  }
  const user = new User({
    username,
    password: bcrypt.hashSync(password, 10),
  })
  user.save((err, _user) => {
    if (err) {
      return res.status(500).json({
        status: 'error',
        message: err
      });
    }
    res.status(201).json({
      status: 'success',
      message: 'You have successfully signed up',
    })
  })
}

const signin = (req, res) => {
  const {
    username,
    password,
  } = req.body;
  User.findOne({username})
  .exec((err, user) => {
    if (err) {
      return res.status(500).json({
        status: 'error',
        message: err
      });
    }
    if (!user) {
      return res.status(400).json({
        status: 'error',
        message: 'Please check your username and password'
      });
    }
    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({
        status: 'error',
        message: 'Please check your username and password'
      });
    }
    const token = jwt.sign(
      {
        id: user._id,
      },
      config.secret,
      {
        expiresIn: 86400,
      }
    );
    return res.status(200).json({
      data: {
        token,
      },
      status: 'success',
      message: 'You have successfully signed in',
    });
  });
}

module.exports = {
  signup,
  signin,
}