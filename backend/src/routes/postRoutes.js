const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
// const authMiddleware = require('../middlewares/authMiddleware'); // Tạm thời bỏ qua middleware xác thực
const fileUploadMiddleware = require('../middlewares/fileUpLoadMiddleware');

router.get('/', postController.getAllPosts);
router.post('/', fileUploadMiddleware.single('file'), postController.createPost); // Bỏ qua authMiddleware
router.get('/:id', postController.getPostById);
router.put('/:id', fileUploadMiddleware.single('file'), postController.updatePost); // Bỏ qua authMiddleware
router.delete('/:id', postController.deletePost); // Bỏ qua authMiddleware

module.exports = router;