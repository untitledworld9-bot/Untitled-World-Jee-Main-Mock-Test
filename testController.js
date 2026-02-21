const Test = require('../models/Test');
const Question = require('../models/Question');

// Get all tests
exports.getAllTests = async (req, res) => {
  try {
    const tests = await Test.find({ status: 'published' }).sort({ date: -1 });
    res.json(tests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get test by ID
exports.getTestById = async (req, res) => {
  try {
    const test = await Test.findById(req.params.testId);
    if (!test) {
      return res.status(404).json({ message: 'Test not found' });
    }
    res.json(test);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get questions for a test
exports.getQuestions = async (req, res) => {
  try {
    const questions = await Question.find({ testId: req.params.testId });
    res.json(questions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};