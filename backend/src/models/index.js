// models/index.js
const sequelize = require('../config/db');  // Đảm bảo rằng sequelize được nhập đúng cách
const User = require('./User');
const Post = require('./Post');
const Tag = require('./Tag');
const Comment = require('./Comment');  // Thêm mô hình Comment
const PostTag = require('./PostTag');

// Khai báo mối quan hệ giữa các mô hình
Post.belongsTo(User, { foreignKey: 'userId' });  // Mỗi bài viết thuộc về một người   

Post.hasMany(Comment, { foreignKey: 'postId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });  // Một bài viết có nhiều bình luận
Comment.belongsTo(Post, { foreignKey: 'postId' });  // Mỗi bình luận thuộc về một bài viết

User.hasMany(Comment, { foreignKey: 'userId', onDelete: 'SET NULL', onUpdate: 'CASCADE' });  // Một người dùng có nhiều bình luận
Comment.belongsTo(User, { foreignKey: 'userId' });  // Mỗi bình luận thuộc về một người dùng

Tag.belongsToMany(Post, { through: PostTag, foreignKey: 'tagId' });
Post.belongsToMany(Tag, { through: PostTag, foreignKey: 'postId' });

module.exports = { User, Post, Tag, Comment, PostTag };  // Đảm bảo rằng Comment cũng được xuất ra
