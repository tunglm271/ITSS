const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const multer = require('multer');

// Cấu hình multer để xử lý dữ liệu từ form (không có file)
const upload = multer();

// Register user
exports.register = async (req, res, next) => {
  try {
    // Nhận dữ liệu từ form (FormData)
    const { name, email, password } = req.body;

    // Kiểm tra xem người dùng đã tồn tại chưa
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'Email is already taken' });
    }

    // Mã hóa mật khẩu trước khi lưu
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });

    res.status(201).json({ message: 'User registered successfully', user });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

// Login user
exports.login = async (req, res, next) => {
  try {
    // Nhận dữ liệu từ form (FormData)
    const { email, password } = req.body;

    // Kiểm tra xem người dùng có tồn tại không
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Kiểm tra mật khẩu
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Tạo JWT token
    const token = jwt.sign({ id: user.id, name: user.name }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token });
  } catch (error) {
    console.error(error);
    next(error);
  }
};
