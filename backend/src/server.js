const app = require('./app');
const sequelize = require('./config/db');
const dotenv = require('dotenv');

dotenv.config();
const PORT = 5000;

// Kết nối đến Database
sequelize.authenticate()
  .then(() => {
    console.log('Database connected...');
    // Sync models
    // sequelize.sync({force: true })
    sequelize.sync()
      .then(() => {
        console.log('All models were synchronized successfully.');
        // Khởi động server sau khi kết nối và sync thành công
        app.listen(PORT, () => {
          console.log(`Server running on port ${PORT}`);
        });
      })
      .catch(err => {
        console.error('Error syncing models:', err);
      });
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

  // Additional logging to check if the server is starting
console.log('Attempting to start the server...');