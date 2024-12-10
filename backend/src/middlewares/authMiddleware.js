// middlewares/authMiddleware.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authMiddleware = async (req, res, next) => {
  const token = req.headers['authorization']; // Hoặc lấy từ cookie, tùy thuộc vào cách bạn gửi token

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);  // Xác thực token
    const user = await User.findByPk(decoded.id);  // Lấy thông tin người dùng từ ID trong token

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    req.user = user;  // Gán thông tin người dùng vào req.user
    next();  // Chuyển tiếp sang middleware hoặc controller tiếp theo
  } catch (err) {
    console.error(err);
    return res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = authMiddleware;
