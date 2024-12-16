const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const authMiddleware = require('../middlewares/authMiddleware');
const upload = require('../middlewares/fileUpLoadMiddleware');

// Lấy tất cả bài viết
router.get('/', postController.getAllPosts);

// Tìm kiếm bài post theo tiêu đề hoặc nội dung
router.get('/search', postController.searchPosts);


// Tạo bài post mới (yêu cầu xác thực và hỗ trợ upload file)
router.post('/', upload.single('file'), postController.createPost);

// Lấy bài post theo ID
router.get('/:id', postController.getPostById);

// Cập nhật bài post (yêu cầu xác thực và hỗ trợ upload file)
router.put('/:id', upload.single('file'), postController.updatePost);

// Xóa bài post (yêu cầu xác thực)
router.delete('/:id', postController.deletePost);


module.exports = router;
