const express = require('express');
const multer = require('multer');
const { adminMiddleware } = require('../middleware/auth');
const {
  createTest,
  uploadTestPDF,
  editTest,
  deleteTest,
  getAnalytics,
} = require('../controllers/adminController');

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 50 * 1024 * 1024 } });

router.post('/test/create', adminMiddleware, createTest);
router.post('/test/upload-pdf', adminMiddleware, upload.single('pdf'), uploadTestPDF);
router.put('/test/:testId', adminMiddleware, editTest);
router.delete('/test/:testId', adminMiddleware, deleteTest);
router.get('/analytics', adminMiddleware, getAnalytics);

module.exports = router;