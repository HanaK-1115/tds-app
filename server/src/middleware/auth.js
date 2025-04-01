const jwt = require('jsonwebtoken');
const { Users } = require('../models');
const config = require('../config/config');

exports.authenticateJWT = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ 
      success: false,
      message: '認証トークンがありません。' 
    });
  }

  const token = authHeader.split(' ')[1]; // "Bearer TOKEN"の形式から取得

  try {
    const decoded = jwt.verify(token, config.jwt.secret);
    
    // ユーザーが存在するか確認
    const user = await Users.findByPk(decoded.id, {
      attributes: { exclude: ['password'] } // パスワードは除外
    });
    
    if (!user) {
      return res.status(401).json({ 
        success: false,
        message: 'ユーザーが見つかりません。' 
      });
    }
    
    // リクエストにユーザー情報を付加
    req.user = user;
    next();
  } catch (error) {
    console.error('JWT検証エラー:', error);
    return res.status(401).json({ 
      success: false,
      message: '無効なトークンです。', 
      error: error.message 
    });
  }
};