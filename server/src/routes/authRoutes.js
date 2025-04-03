const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { validateLogin } = require('../middleware/validators');

// 認証関連ルート
router.post('/login', validateLogin, authController.login);
router.get('/verify-token', authController.verifyToken);
router.post('/logout', authController.logout);

module.exports = router;