// models/Comment.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Post = require('./Post');  // Mối quan hệ với Post
const User = require('./User');  // Mối quan hệ với User

const Comment = sequelize.define('Comment', {
  content: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  postId: {
    type: DataTypes.INTEGER,
    references: {
      model: Post, // Liên kết với bài viết
      key: 'id'
    }
  },
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: User, // Liên kết với người dùng
      key: 'id'
    }
  }
});

module.exports = Comment;
