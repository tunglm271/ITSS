// routes/commentRoutes.js
const express = require('express');
const { createComment, getCommentsByPost } = require('../controllers/commentController');

const router = express.Router();

// Route để tạo bình luận
router.post('/comments', createComment);

// Route để lấy tất cả bình luận của một bài post
router.get('/posts/:postId/comments', getCommentsByPost);

module.exports = router;
