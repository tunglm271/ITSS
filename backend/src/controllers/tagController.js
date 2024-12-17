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

    // Lấy tất cả bài viết của người dùng cùng với các tag liên quan
    const posts = await Post.findAll({
      where: { userId },
      attributes: ['id', 'title', 'content', 'fileUrl', 'commentsCount', 'createdAt', 'updatedAt'],
      include: [{
        model: Tag,  // Bao gồm thông tin từ bảng Tag
        through: { attributes: [] }, // Không lấy thông tin từ bảng trung gian (PostTag)
        attributes: ['name'], // Chỉ lấy tên tag
      }]
    });

    // Biến đổi dữ liệu để chỉ trả về mảng tên tag
    const formattedPosts = posts.map(post => {
      // Lấy mảng tên tag
      const tags = post.Tags.map(tag => tag.name);
      // Loại bỏ "Tags" và trả về bài viết với mảng tags
      const { Tags, ...postData } = post.toJSON();
      return {
        ...postData,
        tags  // Gắn mảng tags vào dữ liệu bài viết
      };
    });

    // Gửi dữ liệu về client
    return res.status(200).json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      },
      posts: formattedPosts  // Gửi bài viết đã được format kèm tags
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};
module.exports = {
  getAllTags,
  getAllPostbyUserId,
};