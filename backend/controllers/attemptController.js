const Attempt = require('../models/Attempt');
const Question = require('../models/Question');
const User = require('../models/User');

// Start attempt
exports.startAttempt = async (req, res) => {
  try {
    const { testId } = req.body;
    const userId = req.user.userId;

    const attempt = new Attempt({
      userId,
      testId,
      startTime: new Date(),
      responses: [],
    });

    await attempt.save();
    res.status(201).json({ message: 'Attempt started', attemptId: attempt._id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Submit attempt
exports.submitAttempt = async (req, res) => {
  try {
    const { attemptId, responses } = req.body;

    const attempt = await Attempt.findById(attemptId);
    if (!attempt) {
      return res.status(404).json({ message: 'Attempt not found' });
    }

    // Calculate scores
    const questions = await Question.find({ testId: attempt.testId });
    let correctCount = 0, incorrectCount = 0, unattemptedCount = 0;
    let totalScore = 0;

    const sectionWiseScore = {
      Physics: { correct: 0, incorrect: 0, unattempted: 0 },
      Chemistry: { correct: 0, incorrect: 0, unattempted: 0 },
      Mathematics: { correct: 0, incorrect: 0, unattempted: 0 },
    };

    for (const q of questions) {
      const response = responses.find(r => r.questionId === q._id.toString());

      if (!response || !response.selectedAnswer) {
        unattemptedCount++;
        sectionWiseScore[q.section].unattempted++;
      } else if (response.selectedAnswer === q.correctAnswer) {
        correctCount++;
        totalScore += q.marks;
        sectionWiseScore[q.section].correct++;
      } else {
        incorrectCount++;
        totalScore -= q.negativeMarks;
        sectionWiseScore[q.section].incorrect++;
      }
    }

    // Calculate percentile (approximation)
    const percentile = calculatePercentile(totalScore);
    const accuracy = ((correctCount / questions.length) * 100).toFixed(2);

    // Update attempt
    attempt.responses = responses;
    attempt.totalMarks = totalScore;
    attempt.correctAnswers = correctCount;
    attempt.incorrectAnswers = incorrectCount;
    attempt.unattempted = unattemptedCount;
    attempt.percentile = percentile;
    attempt.accuracy = accuracy;
    attempt.sectionWiseScore = sectionWiseScore;
    attempt.endTime = new Date();
    attempt.duration = (attempt.endTime - attempt.startTime) / 60000; // in minutes

    await attempt.save();

    res.json({
      message: 'Attempt submitted',
      result: {
        totalMarks: attempt.totalMarks,
        correctAnswers: attempt.correctAnswers,
        incorrectAnswers: attempt.incorrectAnswers,
        unattempted: attempt.unattempted,
        percentile: attempt.percentile,
        accuracy: attempt.accuracy,
        sectionWiseScore: attempt.sectionWiseScore,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get attempt result
exports.getAttemptResult = async (req, res) => {
  try {
    const attempt = await Attempt.findById(req.params.attemptId)
      .populate('testId')
      .populate('userId');

    if (!attempt) {
      return res.status(404).json({ message: 'Attempt not found' });
    }

    res.json(attempt);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get user attempts
exports.getUserAttempts = async (req, res) => {
  try {
    const attempts = await Attempt.find({ userId: req.user.userId })
      .populate('testId')
      .sort({ createdAt: -1 });

    res.json(attempts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Calculate percentile based on marks
function calculatePercentile(marks) {
  // Approximation based on JEE Mains pattern
  // This is a simplified version - adjust based on actual data
  if (marks >= 350) return 99.5;
  if (marks >= 300) return 99;
  if (marks >= 250) return 98;
  if (marks >= 200) return 95;
  if (marks >= 150) return 90;
  if (marks >= 100) return 80;
  if (marks >= 50) return 60;
  return 30;
}