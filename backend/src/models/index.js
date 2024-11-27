const User = require('./User');
const Post = require('./Post');
const Tag = require('./Tag');

User.hasMany(Post); // Một người dùng có nhiều bài viết
Tag.belongsToMany(Post, { through: 'post_tags' }); // Một tag có thể thuộc về nhiều bài viết

module.exports = { User, Post, Tag };
