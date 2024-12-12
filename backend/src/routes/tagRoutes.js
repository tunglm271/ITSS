const express = require('express');
const router = express.Router();
const {getAllTags , getAllPostbyUserId} = require('../controllers/tagController');

router.get('/tags', getAllTags);
router.get('/post/users/:userId', getAllPostbyUserId);

module.exports = router;
