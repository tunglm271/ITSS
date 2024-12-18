const { Tag, Post, User  } = require('../models'); // Đảm bảo đường dẫn tới model Tag đúng

const { Op } = require("sequelize");



const getAllTags = async (req, res) => {
  try {
    const tags = await Tag.findAll({
      include: [{
        model: Post,
        through: { attributes: [] },  
        attributes: [],  
      }],
    });
    const tagsWithPostCount = await Promise.all(tags.map(async (tag) => {
      const postCount = await tag.countPosts();  
      return {
        ...tag.toJSON(),
        postCount,  
      };
    }));
    res.status(200).json(tagsWithPostCount);
    
  } catch (error) {
    console.error('Error fetching tags:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const createTag = async (req, res) => {
  try {
    const { name, description } = req.body;
    if (!name) {
      return res.status(400).json({ message: 'Name is required' });
    }
    const newTag = await Tag.create({
      name,
      description,
    });

    res.status(201).json(newTag);
  } catch (error) {
    console.error('Error creating tag:', error);
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
const findTags = async (req, res) => {
  const { name } = req.params;  

  if (!name) {
      return res.status(400).json({ message: "Name query parameter is required" });
  }

  try {
      const exactMatches = await Tag.findAll({
          where: {
              name: name, 
          },
      });

      if (exactMatches.length > 0) {
          return res.status(200).json(exactMatches);
      }
      const likeMatches = await Tag.findAll({
          where: {
              name: { [Op.like]: `%${name}%` },  
          },
      });
      res.status(200).json(likeMatches);

  } catch (err) {
      console.error("Error finding tag:", err);
      res.status(500).json({ message: "Internal server error" });
  }
};

const getPostsByTag = async (req, res) => {
  const { tagName } = req.params; 

  if (!tagName) {
    return res.status(400).json({ message: "Tag name is required" });
  }

  try {
    const tag = await Tag.findOne({
      where: { name: tagName },  
      include: [{
        model: Post,
        through: { attributes: [] },  
        attributes: ['id', 'title', 'content', 'fileUrl', 'userId', 'createdAt', 'updatedAt'], 
        include: [{
          model: Tag,  
          through: { attributes: [] },  
          attributes: ['name'],  
        }]
      }],
    });

    if (!tag) {
      return res.status(404).json({ message: "Tag not found" });
    }

    const postsWithTags = tag.Posts.map(post => {
      // Lấy mảng các tag liên kết với bài viết
      const tags = post.Tags.map(tag => tag.name);  
      const { Tags, ...postData } = post.toJSON(); 
      return {
        ...postData,
        tags  
      };
    });

    res.status(200).json(postsWithTags);

  } catch (err) {
    console.error("Error fetching posts by tag:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};
module.exports = {
  getAllTags,
  getAllPostbyUserId,
  createTag,
  findTags,
  getPostsByTag,
};