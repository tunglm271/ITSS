const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Tag = require('./Tag');
const User = require('./User');

const Post = sequelize.define('Post', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  fileUrl: {
    type: DataTypes.STRING,  // Lưu đường dẫn file
    allowNull: true
  }
});

// Quan hệ nhiều-nhiều giữa Post và Tag
Post.belongsToMany(Tag, { through: 'post_tags' });
Post.belongsTo(User);  // Mỗi bài viết thuộc về một người dùng

module.exports = Post;
