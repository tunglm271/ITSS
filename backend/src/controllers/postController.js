const Post = require('../models/Post');
const Tag = require('../models/Tag');
const User = require('../models/User');

// Lấy tất cả bài viết
const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.findAll({
      include: [User, Tag], // Bao gồm thông tin User và các Tag liên quan
    });
    res.json(posts);
  } catch (err) {
    console.error('Error in getAllPosts:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Tạo bài post mới
const createPost = async (req, res) => {
  console.log(req)
  const { title, content, tags } = req.body;  // Lấy thông tin từ body
  const file = req.file;

  console.log('Received file:', file);// Kiểm tra file đã được gửi chưa

  if (!title || !content) {
    return res.status(400).json({ message: 'Title and content are required' });
  }
  try {
    // Tạo bài post mới
    const newPost = await Post.create({
      title,
      content,
      // userId: req.user.id,
      userId: 1, // gán tạm thời
      fileUrl: file ? `/uploads/${file.filename}` : null,
    });

    // Xử lý các tag và liên kết với bài post
    if (tags && tags.length > 0) {
      const tagRecords = await Tag.findAll({ where: { name: tags } });
      await newPost.setTags(tagRecords);  // Liên kết tags với bài post
    }

    res.status(201).json(newPost);
  } catch (err) {
    console.error('Error in createPost:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Lấy thông tin bài viết theo ID
const getPostById = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await Post.findByPk(id, {
      include: [User, Tag],  // Bao gồm User và Tag
    });
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.json(post);
  } catch (err) {
    console.error('Error in getPostById:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Cập nhật bài post
const updatePost = async (req, res) => {
  const { id } = req.params;
  const { title, content, tags } = req.body;
  const file = req.file;

  try {
    const post = await Post.findByPk(id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    post.title = title || post.title;
    post.content = content || post.content;
    if (file) {
      post.fileUrl = `/uploads/${file.filename}`;
    }

    await post.save();

    // Cập nhật tags cho bài viết
    if (tags && tags.length > 0) {
      const tagRecords = await Tag.findAll({ where: { name: tags } });
      await post.setTags(tagRecords);
    }

    res.json(post);
  } catch (err) {
    console.error('Error in updatePost:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Xóa bài post
const deletePost = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await Post.findByPk(id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    await post.destroy();
    res.json({ message: 'Post deleted' });
  } catch (err) {
    console.error('Error in deletePost:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getAllPosts,
  createPost,
  getPostById,
  updatePost,
  deletePost,
};
