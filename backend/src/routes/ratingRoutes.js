const express = require('express');
const { createRating, getRatingsByPost, updateRating, deleteRating } = require('../controllers/ratingController');
// const authMiddleware = require('../middlewares/authMiddleware'); // Temporarily bypass authentication

const router = express.Router();

router.post('/', createRating); // Bypass authMiddleware
router.get('/posts/:postId', getRatingsByPost);
router.put('/:id', updateRating); // Bypass authMiddleware
router.delete('/:id', deleteRating); // Bypass authMiddleware

module.exports = router;