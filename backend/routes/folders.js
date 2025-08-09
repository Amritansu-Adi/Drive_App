const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const { createFolder, getFolderContents } = require('../controllers/folderController');

router.post('/', authMiddleware, createFolder);

router.get('/', authMiddleware, getFolderContents);

module.exports = router;
