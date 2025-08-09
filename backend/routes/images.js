const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const upload = require('../config/multer');
const { uploadImage, searchImages } = require('../controllers/imageController');

router.post('/upload', authMiddleware, upload.single('image'), uploadImage);

router.get('/search', authMiddleware, searchImages);

module.exports = router;