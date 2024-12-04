// models/index.js
const sequelize = require('../config/db');  // Đảm bảo rằng sequelize được nhập đúng cách
const User = require('./User');
const Post = require('./Post');
const Tag = require('./Tag');
const Comment = require('./Comment');  // Thêm mô hình Comment

// Khai báo mối quan hệ giữa các mô hình
User.hasMany(Post);  // Một người dùng có nhiều bài viết
Post.belongsTo(User);  // Mỗi bài viết thuộc về một người dùng

Tag.belongsToMany(Post, { through: 'post_tags' });  // Một tag có thể thuộc về nhiều bài viết
Post.belongsToMany(Tag, { through: 'post_tags' });  // Một bài viết có thể có nhiều tag

Post.hasMany(Comment, { foreignKey: 'postId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });  // Một bài viết có nhiều bình luận
Comment.belongsTo(Post, { foreignKey: 'postId' });  // Mỗi bình luận thuộc về một bài viết

User.hasMany(Comment, { foreignKey: 'userId', onDelete: 'SET NULL', onUpdate: 'CASCADE' });  // Một người dùng có nhiều bình luận
Comment.belongsTo(User, { foreignKey: 'userId' });  // Mỗi bình luận thuộc về một người dùng

module.exports = { User, Post, Tag, Comment };  // Đảm bảo rằng Comment cũng được xuất ra
