const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const PostTag = sequelize.define('PostTag', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  postId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Posts',
      key: 'id',
    },
    allowNull: false,
    onDelete: 'CASCADE',
  },
  tagId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Tags',
      key: 'id',
    },
    allowNull: false,
    onDelete: 'CASCADE',
  },
}, {
  timestamps: false,
});

module.exports = PostTag;
