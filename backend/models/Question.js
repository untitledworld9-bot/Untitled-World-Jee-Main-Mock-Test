const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  testId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Test',
    required: true,
  },
  questionNumber: {
    type: Number,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  options: {
    type: [String],
    validate: [arrayLimit, '{PATH} exceeds the limit of 4'],
  },
  correctAnswer: {
    type: String,
    required: true,
  },
  section: {
    type: String,
    enum: ['Physics', 'Chemistry', 'Mathematics'],
    required: true,
  },
  marks: {
    type: Number,
    default: 4,
  },
  negativeMarks: {
    type: Number,
    default: 1,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

function arrayLimit(val) {
  return val.length <= 4;
}

module.exports = mongoose.model('Question', questionSchema);