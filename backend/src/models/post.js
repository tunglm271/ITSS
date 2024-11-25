const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User');
const Class = require('./Class');

const Post = sequelize.define('Post', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  fileUrl: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  // Các trường khác nếu cần
}, {
  timestamps: true,
});

// Định nghĩa mối quan hệ
User.hasMany(Post, { foreignKey: 'userId' });
Post.belongsTo(User, { foreignKey: 'userId' });

Class.hasMany(Post, { foreignKey: 'classId' });
Post.belongsTo(Class, { foreignKey: 'classId' });

module.exports = Post;

