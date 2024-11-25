const Class = require('../models/Class');

exports.getAllClasses = async (req, res, next) => {
  try {
    const classes = await Class.findAll();
    res.json({ classes });
  } catch (error) {
    next(error);
  }
};

exports.createClass = async (req, res, next) => {
  try {
    const { name, description } = req.body;
    const newClass = await Class.create({ name, description });
    res.status(201).json({ message: 'Lớp học được tạo thành công', class: newClass });
  } catch (error) {
    next(error);
  }
};

exports.getClassById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const classData = await Class.findByPk(id);
    if (!classData) {
      return res.status(404).json({ message: 'Không tìm thấy lớp học.' });
    }
    res.json({ class: classData });
  } catch (error) {
    next(error);
  }
};

exports.updateClass = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;
    const classData = await Class.findByPk(id);
    if (!classData) {
      return res.status(404).json({ message: 'Không tìm thấy lớp học.' });
    }
    await classData.update({ name, description });
    res.json({ message: 'Lớp học được cập nhật thành công', class: classData });
  } catch (error) {
    next(error);
  }
};

exports.deleteClass = async (req, res, next) => {
  try {
    const { id } = req.params;
    const classData = await Class.findByPk(id);
    if (!classData) {
      return res.status(404).json({ message: 'Không tìm thấy lớp học.' });
    }
    await classData.destroy();
    res.json({ message: 'Lớp học được xóa thành công' });
  } catch (error) {
    next(error);
  }
};
