const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const upload = require('multer')(); 

router.post('/register', upload.none(), authController.register);
router.post('/login', upload.none(),authController.login);

module.exports = router;
