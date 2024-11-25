const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql',
  logging: false, // Tắt logging để tránh quá nhiều thông tin trong console
});

sequelize.authenticate()
  .then(() => {
    console.log('Kết nối đến cơ sở dữ liệu thành công.');
  })
  .catch(err => {
    console.error('Không thể kết nối đến cơ sở dữ liệu:', err);
  });

module.exports = sequelize;
