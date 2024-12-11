const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Comment = sequelize.define('Comment', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  postId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Posts', // Name of the target model
      key: 'id', // Key in the target model
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  },
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Users', // Name of the target model
      key: 'id', // Key in the target model
    },
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  },
}, {
  timestamps: true,
});

module.exports = Comment;