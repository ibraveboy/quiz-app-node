const db = require('../models');
const Quiz = db.quiz;

const getAllQuizzes = async (req, res) => {
  const { userId } = req;
  console.log({
    userId
  });
  if (!userId) {
    return res.status(401).json({
      status: 'error',
      message: 'You cannot access this resource'
    });
  }
  try {
    const quizzes = await Quiz.find({
      userId
    });
    return res.json({
      message: 'Quizzes retrieved successfully',
      status: 'success',
      data: {
        quizzes
      }
    });
  } catch (err) {
    return res.status(500).json({
      status: 'error',
      message: err
    });
  }
}

const getQuizById = async (req, res) => {
  const {
    id
  } = req.params;
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, Content-Type, Accept"
  );
  if (!id) {
    return res.status(400).json({
      status: 'error',
      message: 'Quiz not found. Try with different id'
    });
  }
  try {
    const quiz = await Quiz.findOne({
      _id: id
    });
    if (!quiz) {
      return res.status(404).json({
        status: 'error',
        message: 'Quiz not found'
      });
    }
    return res.json({
      message: 'Quiz retrieved successfully',
      status: 'success',
      data: {
        quiz
      }
    });
  } catch (err) {
    return res.status(500).json({
      status: 'error',
      message: err
    });
  }
}

const createQuiz = async (req, res) => {
  const {
    title,
    instructions,
    isEnabled,
    endpoint,
    questions
  } = req.body;
  const { userId } = req;
  if (!userId) {
    return res.status(401).json({
      status: 'error',
      message: 'You cannot access this resource'
    });
  }
  if (!title) {
    return res.status(400).json({
      status: 'error',
      message: 'Please enter a title'
    });
  }
  if (!endpoint) {
    return res.status(400).json({
      status: 'error',
      message: 'Please enter endpoint'
    });
  }
  if (!questions || !Array.isArray(questions) || (Array.isArray(questions) && questions.length === 0)) {
    return res.status(400).json({
      status: 'error',
      message: 'At least one question is required'
    });
  }
  try {
    const quiz = await Quiz.create({
      title,
      instructions: instructions || '',
      endpoint,
      questions,
      userId,
      isEnabled: isEnabled || true
    });
    return res.json({
      message: 'Quiz created successfully',
      status: 'success',
      data: {
        quiz
      }
    });
  } catch (err) {
    return res.status(500).json({
      status: 'error',
      message: err
    });
  }
}

const deleteQuiz = async (req, res) => {
  const {
    id
  } = req.params;
  const {
    userId
  } = req;
  if (!id) {
    return res.status(400).json({
      status: 'error',
      message: 'Quiz not found. Try with different id'
    });
  }
  try {
    const quiz = await Quiz.findOneAndDelete({
      _id: id,
      userId
    });
    if (!quiz) {
      return res.status(404).json({
        status: 'error',
        message: 'Quiz not found'
      });
    }
    return res.json({
      message: 'Quiz deleted successfully',
      status: 'success',
    });
  } catch (err) {
    return res.status(500).json({
      status: 'error',
      message: err
    });
  }
}

module.exports = {
  getAllQuizzes,
  getQuizById,
  createQuiz,
  deleteQuiz
}