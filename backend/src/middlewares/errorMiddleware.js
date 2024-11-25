// src/middlewares/errorMiddleware.js

const errorMiddleware = (err, req, res, next) => {
    console.error(err.stack); // Ghi log lỗi vào console để dễ dàng debug
  
    // Kiểm tra xem lỗi có được định nghĩa cụ thể không
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
  
    res.status(statusCode).json({
      success: false,
      message,
    });
  };
  
  module.exports = errorMiddleware;
  