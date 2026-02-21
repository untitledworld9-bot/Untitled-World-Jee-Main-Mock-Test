const mongoose = require('mongoose');

const testSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  shift: {
    type: String,
    enum: ['Shift 1', 'Shift 2'],
    required: true,
  },
  duration: {
    type: Number,
    default: 180, // minutes
  },
  totalQuestions: {
    type: Number,
    default: 75,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ['draft', 'published', 'archived'],
    default: 'draft',
  },
});

module.exports = mongoose.model('Test', testSchema);
