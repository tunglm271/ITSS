const express = require('express');
const router = express.Router();
const upload = require('multer')(); 
const {getAllTags , getAllPostbyUserId, createTag ,findTags , getPostsByTag} = require('../controllers/tagController');

router.get('/tags', getAllTags);
router.get('/post/users/:userId', getAllPostbyUserId);
router.post('/tags', upload.none(), createTag);
router.get('/findtags/:name', findTags);
router.get('/tags/:tagName', getPostsByTag);
module.exports = router;
