const express = require('express');
const { authMiddleware } = require('../middleware/auth');
const {
  startAttempt,
  submitAttempt,
  getAttemptResult,
  getUserAttempts,
} = require('../controllers/attemptController');

const router = express.Router();

router.post('/start', authMiddleware, startAttempt);
router.post('/submit', authMiddleware, submitAttempt);
router.get('/result/:attemptId', authMiddleware, getAttemptResult);
router.get('/user/history', authMiddleware, getUserAttempts);

module.exports = router;