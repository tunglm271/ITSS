const Post = require("../models/Post");
const Tag = require("../models/Tag");
const User = require("../models/User");
const fs = require("fs");
const path = require("path");

const { Op } = require("sequelize");

// Đảm bảo thư mục uploads tồn tại
const ensureUploadsDirectoryExists = () => {
    const uploadPath = path.join(__dirname, "../uploads");
    if (!fs.existsSync(uploadPath)) {
        fs.mkdirSync(uploadPath, { recursive: true });
    }
};

// Lấy tất cả bài viết
const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.findAll({
            include: [User, Tag], // Bao gồm thông tin User và các Tag liên quan
        });
        res.json(posts);
    } catch (err) {
        console.error("Error in getAllPosts:", err);
        res.status(500).json({ message: "Server error" });
    }
};

// Tạo bài post mới
const createPost = async (req, res) => {

  const { title, content, tags, userId} = req.body;  // Lấy thông tin từ body
  const file = req.file;  // Lấy file từ req.file (thường là dùng multer để upload file)
    //console.log("Received file:", file); // Kiểm tra file đã được gửi chưa

    if (!title || !content) {
        return res
            .status(400)
            .json({ message: "Title and content are required" });
    }

    // Kiểm tra nếu có file thì tạo đường dẫn lưu trữ
    let fileUrl = null;
    if (file) {
        ensureUploadsDirectoryExists(); // Đảm bảo thư mục uploads tồn tại
        fileUrl = file.path;
    }
  try {
    // Tạo bài post mới
    const newPost =  Post.build({
      title,
      content,
      userId, // gán tạm thời
      fileUrl,
    });

    // Xử lý các tag và liên kết với bài post
    if (tags && tags.length > 0) {
      const tagRecords = await Tag.findAll({ where: { name: tags } });
      await newPost.setTags(tagRecords);  // Liên kết tags với bài post
    }

    await newPost.save();

    res.status(201).json(newPost);
  } catch (err) {
    console.error('Error in createPost:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Lấy thông tin bài viết theo ID
const getPostById = async (req, res) => {
    const { id } = req.params;

    try {
        const post = await Post.findByPk(id, {
            include: [User, Tag], // Bao gồm User và Tag
        });
        if (!post) {
            return res
                .status(404)
                .json({ message: "Post not found (getPostById)" });
        }
        res.json(post);
    } catch (err) {
        console.error("Error in getPostById:", err);
        res.status(500).json({ message: "Server error" });
    }
};

// Cập nhật bài post
const updatePost = async (req, res) => {
    const { id } = req.params;
    const { title, content, tags } = req.body;
    const file = req.file;

    try {
        const post = await Post.findByPk(id);
        if (!post) {
            return res
                .status(404)
                .json({ message: "Post not found (updatePost)" });
        }

        post.title = title || post.title;
        post.content = content || post.content;
        if (file) {
            ensureUploadsDirectoryExists(); // Đảm bảo thư mục uploads tồn tại
            post.fileUrl = `/uploads/${file.filename}`;
        }

        await post.save();

        // Cập nhật tags cho bài viết
        if (tags && tags.length > 0) {
            const tagRecords = await Tag.findAll({ where: { name: tags } });
            await post.setTags(tagRecords);
        }

        res.json(post);
    } catch (err) {
        console.error("Error in updatePost:", err);
        res.status(500).json({ message: "Server error" });
    }
};

// Xóa bài post
const deletePost = async (req, res) => {
    const { id } = req.params;

    try {
        const post = await Post.findByPk(id);
        if (!post) {
            return res
                .status(404)
                .json({ message: "Post not found (deletePost" });
        }

        await post.destroy();
        res.json({ message: "Post deleted" });
    } catch (err) {
        console.error("Error in deletePost:", err);
        res.status(500).json({ message: "Server error" });
    }
};

const searchPosts = async (req, res) => {
  const { query } = req.query;

  if (!query) {
      return res.status(400).json({ message: "Query parameter is required" });
  }

  try {
      // Tìm kiếm chính xác theo tiêu đề
      const exactMatches = await Post.findAll({
          where: {
              title: query, // So khớp chính xác
          },
          include: [User, Tag],
      });

      // Nếu tìm thấy bài viết chính xác, trả về
      if (exactMatches.length > 0) {
          return res.json(exactMatches);
      }

      // Tìm kiếm chứa từ khóa
      const likeMatches = await Post.findAll({
          where: {
              [Op.or]: [
                  { title: { [Op.like]: `%${query}%` } },
                  { content: { [Op.like]: `%${query}%` } },
              ],
          },
          include: [User, Tag],
      });

      // Trả về kết quả tìm kiếm, dù có bài viết hay không
      res.json(likeMatches);

  } catch (err) {
      console.error("Error in searchPosts:", err);
      res.status(500).json({ message: "Server error" });
  }
};


module.exports = {
    getAllPosts,
    createPost,
    getPostById,
    updatePost,
    deletePost,
    searchPosts,
};