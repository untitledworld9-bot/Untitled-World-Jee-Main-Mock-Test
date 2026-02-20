const express = require('express');
const { authMiddleware } = require('../middleware/auth');
const {
  getAllTests,
  getTestById,
  getQuestions,
} = require('../controllers/testController');

const router = express.Router();

router.get('/', authMiddleware, getAllTests);
router.get('/:testId', authMiddleware, getTestById);
router.get('/:testId/questions', authMiddleware, getQuestions);

module.exports = router;