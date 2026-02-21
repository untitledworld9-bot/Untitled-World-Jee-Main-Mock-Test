const Test = require('../models/Test');
const Question = require('../models/Question');
const Attempt = require('../models/Attempt');
const pdfParse = require('pdf-parse');

// Create test
exports.createTest = async (req, res) => {
  try {
    const { name, date, shift } = req.body;

    const test = new Test({
      name,
      date,
      shift,
      status: 'draft',
    });

    await test.save();
    res.status(201).json({ message: 'Test created', test });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Upload and parse PDF
exports.uploadTestPDF = async (req, res) => {
  try {
    const { testId } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const data = await pdfParse(req.file.buffer);
    const text = data.text;

    // Simple parsing logic - extract Q/A pairs
    const questions = parseQuestionsFromPDF(text);

    // Save questions to database
    for (let q of questions) {
      const question = new Question({
        testId,
        ...q,
      });
      await question.save();
    }

    // Update test status
    await Test.findByIdAndUpdate(testId, { status: 'published' });

    res.json({
      message: 'PDF processed successfully',
      questionsCreated: questions.length,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Parse questions from PDF text
function parseQuestionsFromPDF(text) {
  const questions = [];
  const lines = text.split('\n');
  
  // Example parsing - customize based on your PDF format
  let currentQuestion = null;
  let section = 'Physics';
  let questionNum = 1;

  // Simple implementation - in production, use more sophisticated parsing
  questions.push({
    questionNumber: 1,
    text: 'Sample Question 1',
    options: ['Option A', 'Option B', 'Option C', 'Option D'],
    correctAnswer: 'Option A',
    section: 'Physics',
  });

  return questions;
}

// Edit test
exports.editTest = async (req, res) => {
  try {
    const { testId } = req.params;
    const updates = req.body;

    const test = await Test.findByIdAndUpdate(testId, updates, { new: true });
    res.json({ message: 'Test updated', test });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete test
exports.deleteTest = async (req, res) => {
  try {
    const { testId } = req.params;

    await Test.findByIdAndDelete(testId);
    await Question.deleteMany({ testId });

    res.json({ message: 'Test deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get analytics
exports.getAnalytics = async (req, res) => {
  try {
    const totalAttempts = await Attempt.countDocuments();
    const avgScore = await Attempt.aggregate([
      { $group: { _id: null, avgMarks: { $avg: '$totalMarks' } } },
    ]);

    res.json({
      totalAttempts,
      averageScore: avgScore[0]?.avgMarks || 0,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};