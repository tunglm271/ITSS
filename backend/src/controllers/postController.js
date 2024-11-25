const Post = require('../models/Post');
const Class = require('../models/Class');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const fs = require('fs');

exports.getAllPosts = async (req, res, next) => {
  try {
    const { classId } = req.query;
    let where = {};
    if (classId) {
      where.classId = classId;
    }
    const posts = await Post.findAll({
      where,
      include: [{ model: Class }, { model: require('../models/User'), attributes: ['id', 'name', 'email'] }],
      order: [['createdAt', 'DESC']],
    });
    res.json({ posts });
  } catch (error) {
    next(error);
  }
};

exports.createPost = async (req, res, next) => {
  try {
    const { title, content, classId } = req.body;
    let fileUrl = null;
    if (req.file) {
      fileUrl = `/uploads/${req.file.filename}`;
    }
    const newPost = await Post.create({
      title,
      content,
      classId,
      userId: req.user.id,
      fileUrl,
    });
    res.status(201).json({ message: 'Bài post được tạo thành công', post: newPost });
  } catch (error) {
    next(error);
  }
};

exports.getPostById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const post = await Post.findByPk(id, {
      include: [{ model: Class }, { model: require('../models/User'), attributes: ['id', 'name', 'email'] }],
    });
    if (!post) {
      return res.status(404).json({ message: 'Không tìm thấy bài post.' });
    }
    res.json({ post });
  } catch (error) {
    next(error);
  }
};

exports.updatePost = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, content, classId } = req.body;
    const post = await Post.findByPk(id);
    if (!post) {
      return res.status(404).json({ message: 'Không tìm thấy bài post.' });
    }
    if (post.userId !== req.user.id) {
      return res.status(403).json({ message: 'Bạn không có quyền chỉnh sửa bài post này.' });
    }
    let fileUrl = post.fileUrl;
    if (req.file) {
      // Xóa file cũ nếu có
      if (post.fileUrl) {
        const oldFilePath = path.join(__dirname, '../../', post.fileUrl);
        fs.unlink(oldFilePath, (err) => {
          if (err) console.error('Error deleting old file:', err);
        });
      }
      fileUrl = `/uploads/${req.file.filename}`;
    }
    await post.update({ title, content, classId, fileUrl });
    res.json({ message: 'Bài post được cập nhật thành công', post });
  } catch (error) {
    next(error);
  }
};

exports.deletePost = async (req, res, next) => {
  try {
    const { id } = req.params;
    const post = await Post.findByPk(id);
    if (!post) {
      return res.status(404).json({ message: 'Không tìm thấy bài post.' });
    }
    if (post.userId !== req.user.id) {
      return res.status(403).json({ message: 'Bạn không có quyền xóa bài post này.' });
    }
    // Xóa file nếu có
    if (post.fileUrl) {
      const filePath = path.join(__dirname, '../../', post.fileUrl);
      fs.unlink(filePath, (err) => {
        if (err) console.error('Error deleting file:', err);
      });
    }
    await post.destroy();
    res.json({ message: 'Bài post được xóa thành công' });
  } catch (error) {
    next(error);
  }
};
