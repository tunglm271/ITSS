const express = require('express');
const router = express.Router();
const classController = require('../controllers/classController');
const authMiddleware = require('../middlewares/authMiddleware');

// Tất cả các route bên dưới đều yêu cầu xác thực
router.use(authMiddleware);

router.get('/', classController.getAllClasses);
router.post('/', classController.createClass);
router.get('/:id', classController.getClassById);
router.put('/:id', classController.updateClass);
router.delete('/:id', classController.deleteClass);

module.exports = router;
