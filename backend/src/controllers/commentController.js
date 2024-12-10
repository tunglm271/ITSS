// controllers/commentController.js
const multer = require('multer');
const { Comment, Post, User } = require('../models');

// Thiết lập multer để xử lý form data
const storage = multer.memoryStorage(); // Hoặc bạn có thể dùng diskStorage nếu muốn lưu tệp trên server
const upload = multer({ storage: storage });

// Tạo bình luận
const createComment = async (req, res) => {
  const { postId, content, userId } = req.body; // Dữ liệu từ form data
  // const userId = req.user.id;  // Giả sử bạn đang xác thực người dùng

  if (!content) {
    return res.status(400).json({ message: 'Content is required for the comment' });
  }

  try {
    const post = await Post.findByPk(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    const newComment = await Comment.create({
      postId,
      userId,
      content
    });

    res.status(201).json(newComment);
  } catch (err) {
    console.error('Error in createComment:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Lấy tất cả bình luận của một bài post
const getCommentsByPost = async (req, res) => {
  const { postId } = req.params;

  try {
    const comments = await Comment.findAll({
      where: { postId },
      include: [User],  // Bao gồm thông tin người dùng đã bình luận
    });

    if (comments.length === 0) {
      return res.status(404).json({ message: 'No comments found' });
    }

    res.status(200).json(comments);
  } catch (err) {
    console.error('Error in getCommentsByPost:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { createComment, getCommentsByPost };
