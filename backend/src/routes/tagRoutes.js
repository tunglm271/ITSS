const express = require('express');
const router = express.Router();
const upload = require('multer')(); 
const {getAllTags , getAllPostbyUserId, createTag} = require('../controllers/tagController');

router.get('/tags', getAllTags);
router.get('/post/users/:userId', getAllPostbyUserId);
router.post('/tags', upload.none(), createTag);
module.exports = router;
