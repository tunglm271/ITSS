const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User');
const Post = require('./Post');

const Rating = sequelize.define('Rating', {
  rating: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 5,
    },
  },
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id',
    },
  },
  postId: {
    type: DataTypes.INTEGER,
    references: {
      model: Post,
      key: 'id',
    },
  },
  comment: {
    type: DataTypes.TEXT, // Thêm trường comment
    allowNull: true,
  },
});

module.exports = Rating;