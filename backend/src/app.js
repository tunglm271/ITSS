const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const morgan = require('morgan');

const authRoutes = require('./routes/authRoutes');
const postRoutes = require('./routes/postRoutes');
const ratingRoutes = require('./routes/ratingRoutes'); // Import rating routes

const errorMiddleware = require('./middlewares/errorMiddleware');
const authMiddleware = require('./middlewares/authMiddleware');
dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(morgan('combined'));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/ratings', ratingRoutes); // Use rating routes

app.get('/profile', authMiddleware, (req, res) => {
  const { id, name } = req.user;
  res.json({ id, name });
});

// Error Handling Middleware
app.use(errorMiddleware);

module.exports = app;