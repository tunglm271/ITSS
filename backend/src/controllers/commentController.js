// controllers/commentController.js
const { Comment, Post, User } = require('../models');

// Tạo bình luận mới
const createComment = async (req, res) => {
  const { content, postId } = req.body;
  const userId = req.user.id; // Giả sử bạn đang sử dụng xác thực người dùng

  try {
    const comment = await Comment.create({
      content,
      postId,
      userId,
    });

    // Cập nhật lại số lượng bình luận của bài viết
    const post = await Post.findByPk(postId);
    post.commentsCount += 1;
    await post.save();

    res.status(201).json(comment);
  } catch (err) {
    console.error('Error creating comment:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Lấy tất cả bình luận của một bài viết
const getCommentsByPost = async (req, res) => {
  const { postId } = req.params;

  try {
    const comments = await Comment.findAll({
      where: { postId },
      include: [User], // Bao gồm thông tin người dùng
    });

    res.json(comments);
  } catch (err) {
    console.error('Error fetching comments:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  createComment,
  getCommentsByPost,
};
