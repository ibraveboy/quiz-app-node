const verifySignUp = require('./verifySignup.middleware');
const authJWT = require('./authJWT.middleware');

module.exports = {
  ...verifySignUp,
  ...authJWT,
}