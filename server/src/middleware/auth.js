const jwt = require('jsonwebtoken');
const config = require('../config/config');
const { Users } = require('../models');

/**
 * JWT認証ミドルウェア
 */
exports.authenticate = async (req, res, next) => {
  try {
    // ヘッダーからトークンを取得
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({ 
        message: '認証が必要です。有効なトークンを提供してください。' 
      });
    }

    // トークンを検証
    const decoded = jwt.verify(token, config.jwt.secret);
    
    // ユーザーが存在するか確認
    const user = await Users.findByPk(decoded.id);
    
    if (!user) {
      return res.status(401).json({ 
        message: '無効なトークンです。ユーザーが見つかりません。' 
      });
    }

    // リクエストオブジェクトにユーザー情報を追加
    req.user = decoded;
    next();
    
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ 
        message: 'トークンの有効期限が切れています。再度ログインしてください。' 
      });
    }
    
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ 
        message: '無効なトークンです。' 
      });
    }
    
    console.error('認証エラー:', error);
    return res.status(500).json({ 
      message: '認証処理中にエラーが発生しました。' 
    });
  }
};

/**
 * ロールベースの認可ミドルウェア
 */
exports.checkRole = (roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ 
        message: '認証が必要です。' 
      });
    }

    // トークンから取得したroleIdを使用してロールを確認
    const roleId = req.user.roleId;
    
    // roleIdを数値に変換して比較（roles配列には数値が含まれていると仮定）
    if (!roles.includes(roleId)) {
      return res.status(403).json({ 
        message: 'このアクションを実行する権限がありません。' 
      });
    }

    next();
  };
};