const {
  verifyToken
} = require('../middlewares');
const controller = require('../controllers/quiz.controller');

module.exports = (app) => {
  app.use(function(_, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.get(
    "/api/all-quizzes",
    [verifyToken],
    controller.getAllQuizzes
  );
  app.get(
    "/api/quiz/:id",
    controller.getQuizById
  );
  app.post(
    "/api/quiz",
    [verifyToken],
    controller.createQuiz
  );
}