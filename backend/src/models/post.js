// src/models/Post.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User');

const Post = sequelize.define('Post', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
  },
  fileUrl: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  // Các tùy chọn khác nếu cần
});

// Định nghĩa mối quan hệ với User
Post.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Post, { foreignKey: 'userId' });

module.exports = Post;
