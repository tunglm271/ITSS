const sequelize = require('../config/db');
const User = require('./User');
const Post = require('./Post');
const Tag = require('./Tag');
const Comment = require('./Comment');
const Rating = require('./Rating'); // Import Rating model

// Define relationships
User.hasMany(Post);
Post.belongsTo(User);

Tag.belongsToMany(Post, { through: 'post_tags' });
Post.belongsToMany(Tag, { through: 'post_tags' });

Post.hasMany(Comment, { foreignKey: 'postId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
Comment.belongsTo(Post, { foreignKey: 'postId' });

User.hasMany(Comment, { foreignKey: 'userId', onDelete: 'SET NULL', onUpdate: 'CASCADE' });
Comment.belongsTo(User, { foreignKey: 'userId' });

Post.hasMany(Rating, { foreignKey: 'postId', onDelete: 'CASCADE', onUpdate: 'CASCADE' }); // One post can have many ratings
Rating.belongsTo(Post, { foreignKey: 'postId' });

User.hasMany(Rating, { foreignKey: 'userId', onDelete: 'CASCADE', onUpdate: 'CASCADE' }); // One user can give many ratings
Rating.belongsTo(User, { foreignKey: 'userId' });

module.exports = { User, Post, Tag, Comment, Rating }; // Export Rating model