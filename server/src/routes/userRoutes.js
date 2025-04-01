const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authenticate, checkRole } = require('../middlewares/auth');
const { validateUserCreate, validateUserUpdate } = require('../middlewares/validators');

// ユーザー管理ルート
router.post('/register', userController.register); // roleId 1 = 管理者
router.get('/', authenticate, checkRole([1]), userController.getAllUsers);
router.get('/:id', authenticate, userController.getUserById);
router.put('/:id', authenticate, validateUserUpdate, userController.updateUser);
router.delete('/:id', authenticate, checkRole([1]), userController.deleteUser);

// 自分のプロファイル関連
router.get('/profile/me', authenticate, userController.getProfile);
router.put('/profile/me', authenticate, validateUserUpdate, userController.updateProfile);
router.post('/change-password', authenticate, userController.changePassword);

module.exports = router;