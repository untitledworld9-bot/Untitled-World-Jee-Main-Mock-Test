const mongoose = require('mongoose');

const attemptSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  testId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Test',
    required: true,
  },
  responses: [{
    questionId: mongoose.Schema.Types.ObjectId,
    selectedAnswer: String,
    isMarked: Boolean,
    isReviewed: Boolean,
  }],
  totalMarks: {
    type: Number,
    default: 0,
  },
  correctAnswers: {
    type: Number,
    default: 0,
  },
  incorrectAnswers: {
    type: Number,
    default: 0,
  },
  unattempted: {
    type: Number,
    default: 75,
  },
  percentile: {
    type: Number,
    default: 0,
  },
  accuracy: {
    type: Number,
    default: 0,
  },
  sectionWiseScore: {
    physics: { correct: 0, incorrect: 0, unattempted: 0 },
    chemistry: { correct: 0, incorrect: 0, unattempted: 0 },
    mathematics: { correct: 0, incorrect: 0, unattempted: 0 },
  },
  startTime: Date,
  endTime: Date,
  duration: Number,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Attempt', attemptSchema);