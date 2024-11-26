// src/models/index.js
const sequelize = require('../config/db');
const User = require('./User');
const Post = require('./Post');

// Định nghĩa các mối quan hệ đã được định nghĩa trong từng model riêng
module.exports = {
  sequelize,
  User,
  Post,
};
