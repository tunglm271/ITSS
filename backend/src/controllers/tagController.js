const { Tag } = require('../models'); // Đảm bảo đường dẫn tới model Tag đúng

const getAllTags = async (req, res) => {
  try {
    const tags = await Tag.findAll();
    res.status(200).json(tags);
  } catch (error) {
    console.error('Error fetching tags:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  getAllTags,
};