const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const optionSchema = new Schema({
  option: {
    type: String,
    required: true,
  },
});

const questionSchema = new Schema(
  {
    question: {
      type: String,
      required: true,
    },
    options: [optionSchema],
    correctAnswer: {
      type: Number,
      required: true,
    },
    isEnabled: {
      type: Boolean,
      default: true,
    },
    explanation: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);
const quizSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    instructions: {
      type: String,
      required: false,
    },
    isEnabled: {
      type: Boolean,
      default: true,
    },
    uniqueId: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    questions: [questionSchema],
  },
  {
    timestamps: true,
  }
);

const Quize = mongoose.model("Quiz", quizSchema);
module.exports = Quize;
