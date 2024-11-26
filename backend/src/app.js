const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const morgan = require('morgan');

const authRoutes = require('./routes/authRoutes');
const postRoutes = require('./routes/postRoutes');

const errorMiddleware = require('./middlewares/errorMiddleware');

dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:5173', // URL của frontend
  credentials: true,
}));
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Serve static files
app.use(morgan('combined'));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);

// Error Handling Middleware
app.use(errorMiddleware);

module.exports = app;
