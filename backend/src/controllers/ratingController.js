const { Rating, User } = require('../models');

const createRating = async (req, res) => {
  const { rating, postId, comment } = req.body;
  const userId = 1; // Use a temporary value for userId

  try {
    const newRating = await Rating.create({ rating, postId, userId, comment });
    res.status(201).json(newRating);
  } catch (err) {
    console.error('Error creating rating:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

const getRatingsByPost = async (req, res) => {
  const { postId } = req.params;

  try {
    const ratings = await Rating.findAll({ where: { postId }, include: [User] });
    res.json(ratings);
  } catch (err) {
    console.error('Error fetching ratings:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

const updateRating = async (req, res) => {
  const { id } = req.params;
  const { rating, comment } = req.body;

  try {
    const ratingToUpdate = await Rating.findByPk(id);
    if (!ratingToUpdate) {
      return res.status(404).json({ message: 'Rating not found' });
    }

    ratingToUpdate.rating = rating;
    ratingToUpdate.comment = comment;
    await ratingToUpdate.save();

    res.json(ratingToUpdate);
  } catch (err) {
    console.error('Error updating rating:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

const deleteRating = async (req, res) => {
  const { id } = req.params;

  try {
    const ratingToDelete = await Rating.findByPk(id);
    if (!ratingToDelete) {
      return res.status(404).json({ message: 'Rating not found' });
    }

    await ratingToDelete.destroy();
    res.json({ message: 'Rating deleted' });
  } catch (err) {
    console.error('Error deleting rating:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { createRating, getRatingsByPost, updateRating, deleteRating };