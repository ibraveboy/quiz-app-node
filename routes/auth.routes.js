const {
  checkDuplicateUsernameOrEmail
} = require('../middlewares')
const controller = require('../controllers/auth.controller');

module.exports = (app) => {
  app.use(function(_, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.post(
    "/api/auth/signup",
    [
      checkDuplicateUsernameOrEmail,
    ],
    controller.signup
  );
  app.post("/api/auth/signin", controller.signin);
}