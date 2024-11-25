const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const authMiddleware = require('../middlewares/authMiddleware');
const fileUploadMiddleware = require('../middlewares/fileUploadMiddleware');

// Tất cả các route bên dưới đều yêu cầu xác thực
router.use(authMiddleware);

router.get('/', postController.getAllPosts);
router.post('/', fileUploadMiddleware.single('file'), postController.createPost);
router.get('/:id', postController.getPostById);
router.put('/:id', fileUploadMiddleware.single('file'), postController.updatePost);
router.delete('/:id', postController.deletePost);

module.exports = router;
