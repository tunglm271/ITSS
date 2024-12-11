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
      model: Post,
      key: 'id'
    },
    allowNull: false // Đảm bảo postId không được null
  },
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id'
    },
    allowNull: true // Đảm bảo userId không được null
  }
});


module.exports = Comment;
