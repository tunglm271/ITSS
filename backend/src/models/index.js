const sequelize = require('../config/db');
const User = require('./User');
const Class = require('./Class');
const Post = require('./Post');

// Định nghĩa các mối quan hệ nếu có
User.hasMany(Post, { foreignKey: 'userId' });
Post.belongsTo(User, { foreignKey: 'userId' });

Class.hasMany(Post, { foreignKey: 'classId' });
Post.belongsTo(Class, { foreignKey: 'classId' });

const db = {
  User,
  Class,
  Post,
  sequelize,
};

module.exports = db;
