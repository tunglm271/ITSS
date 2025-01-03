const Post = require("../models/Post");
const Tag = require("../models/Tag");
const User = require("../models/User");
const PostTag = require("../models");
const fs = require("fs");
const path = require("path");
const multer = require('multer');

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
    console.log('0');
    try {
        console.log('1');
        const posts = await Post.findAll({
            include: [{
                model: Tag,  
                through: { attributes: [] }, 
                attributes: ['name'], 
            }]
        });
        const formattedPosts = posts.map(post => {
           
            const tags = post.Tags.map(tag => tag.name);
            const { Tags, ...postData } = post.toJSON(); 
            return {
                ...postData,
                tags
            };
        });

        res.json(formattedPosts);
    } catch (err) {
        console.error("Error in getAllPosts:", err);
        res.status(500).json({ message: "Server error" });
    }
};

// Tạo bài post mới
const createPost = async (req, res) => {
    const { title, content, tags, userId, formUrl} = req.body; // Lấy thông tin từ body
    const file = req.file; // Lấy file từ req.file (thường dùng multer để upload file)

    if (!title || !content) {
        return res.status(400).json({ message: "Title and content are required" });
    }

    // Kiểm tra nếu có file thì tạo đường dẫn lưu trữ
    let fileUrl = null;
    if (file) {
        ensureUploadsDirectoryExists(); // Đảm bảo thư mục uploads tồn tại
        fileUrl = file.path;
    }

    try {
        // Tạo bài post mới
        const newPost = await Post.create({
            title,
            content,
            userId,
            formUrl,
            fileUrl: file ? `/uploads/${file.filename}` : null,
        });

        // Xử lý các tag và liên kết với bài post
        if (tags) {
            // Nếu tags là chuỗi JSON, parse nó thành mảng
            let tagArray = [];
            try {
                tagArray = JSON.parse(tags);
            } catch (e) {
                console.error('Error parsing tags:', e);
                return res.status(400).json({ message: 'Invalid format for tags' });
            }

            // Kiểm tra nếu tagArray là mảng
            if (Array.isArray(tagArray) && tagArray.length > 0) {
                for (const tagName of tagArray) {
                    const [tag] = await Tag.findOrCreate({
                        where: { name: tagName.trim() },
                        defaults: { description: `Tag for ${tagName.trim()}` },
                    });

                    await newPost.addTag(tag);
                }
            }
        }

        res.status(201).json({
            message: "Post created successfully",
            post: newPost,
        });
    } catch (err) {
        console.error("Error in createPost:", err);
        res.status(500).json({ message: "Server error" });
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
            include: [{
                model: Tag,  
                through: { attributes: [] }, // Không lấy thông tin về bảng trung gian (PostTag)
                attributes: ['name'], // Lấy tên của tag
            }]
        });

        // Nếu tìm thấy bài viết chính xác, trả về
        if (exactMatches.length > 0) {
            const formattedPosts = exactMatches.map(post => {
                const tags = post.Tags.map(tag => tag.name); // Lấy danh sách tên tags
                const { Tags, ...postData } = post.toJSON(); // Loại bỏ thông tin Tags không cần thiết
                return {
                    ...postData,
                    tags, // Thêm tags vào kết quả
                };
            });
            return res.json(formattedPosts);
        }

        // Tìm kiếm chứa từ khóa trong tiêu đề hoặc nội dung
        const likeMatches = await Post.findAll({
            where: {
                [Op.or]: [
                    { title: { [Op.like]: `%${query}%` } },
                    { content: { [Op.like]: `%${query}%` } },
                ],
            },
            include: [{
                model: Tag,  
                through: { attributes: [] }, // Không lấy thông tin về bảng trung gian (PostTag)
                attributes: ['name'], // Lấy tên của tag
            }]
        });

        // Xử lý và trả về kết quả tìm kiếm
        const formattedLikeMatches = likeMatches.map(post => {
            const tags = post.Tags.map(tag => tag.name); // Lấy danh sách tên tags
            const { Tags, ...postData } = post.toJSON(); // Loại bỏ thông tin Tags không cần thiết
            return {
                ...postData,
                tags, // Thêm tags vào kết quả
            };
        });

        res.json(formattedLikeMatches);

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