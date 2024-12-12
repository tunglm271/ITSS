const { Tag, Post, User } = require('../models'); // Đảm bảo đường dẫn tới model Tag đúng

const getAllTags = async (req, res) => {
  try {
    const tags = await Tag.findAll();
    res.status(200).json(tags);
  } catch (error) {
    console.error('Error fetching tags:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


const getAllPostbyUserId = async (req, res) => {
  try {
    const { userId } = req.params; 
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const posts = await Post.findAll({
      where: { userId },

      attributes: ['id', 'title', 'content', 'fileUrl', 'commentsCount', 'createdAt', 'updatedAt']
    });
    return res.status(200).json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      },
      posts
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error', error: error.message });
  }
}

module.exports = {
  getAllTags,
  getAllPostbyUserId,
};