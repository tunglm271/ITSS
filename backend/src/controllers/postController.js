// src/controllers/postController.js
const Post = require('../models/Post');
const User = require('../models/User');

const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.findAll({
      include: [User],
    });
    res.json(posts);
  } catch (err) {
    console.error('Error in getAllPosts:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

const createPost = async (req, res) => {
  const { title, content } = req.body;
  const file = req.file;

  try {
    const newPost = await Post.create({
      title,
      content,
      userId: req.user.id,
      fileUrl: file ? `/uploads/${file.filename}` : null,
    });
    res.status(201).json(newPost);
  } catch (err) {
    console.error('Error in createPost:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

const getPostById = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await Post.findByPk(id, {
      include: [User],
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

const updatePost = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
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

    res.json(post);
  } catch (err) {
    console.error('Error in updatePost:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

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
