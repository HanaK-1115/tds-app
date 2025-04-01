const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { Users, Departments, Roles } = require('../models');
const config = require('../config/config');
const authService = require('../services/authService');

/**
 * ユーザーログイン処理
 */
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log(`ログイン試行: ユーザー名=${username}`);
    
    // ユーザー認証と詳細情報の取得
    const authResult = await authService.authenticateUser(username, password);
    
    if (!authResult.success) {
      return res.status(401).json({ message: authResult.message });
    }
    
    // JWTトークン生成
    const token = jwt.sign(
      authResult.tokenPayload, 
      config.jwt.secret, 
      { expiresIn: config.jwt.expiresIn }
    );
    
    console.log(`ログイン成功: トークンを生成しました (ユーザー名: ${username})`);
    
    // レスポンス返却
    res.status(200).json({
      success: true,
      token,
      user: authResult.userDetails
    });
  } catch (error) {
    console.error('ログインエラー:', error);
    res.status(500).json({ 
      message: 'サーバーエラーが発生しました。管理者にお問い合わせください。' 
    });
  }
};

/**
 * JWTトークン検証
 */
exports.verifyToken = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ message: 'トークンが提供されていません。' });
    }
    
    // トークン検証
    const decoded = await authService.verifyJwtToken(token);
    
    // ユーザー情報の取得
    const user = await authService.getUserDetails(decoded.id);
    
    if (!user) {
      return res.status(401).json({ message: 'ユーザーが見つかりません。' });
    }
    
    res.status(200).json({
      success: true,
      user
    });
  } catch (error) {
    console.error('トークン検証エラー:', error);
    res.status(401).json({ message: 'トークンが無効です。' });
  }
};

/**
 * ログアウト処理（必要に応じて）
 */
exports.logout = (req, res) => {
  // JWTはクライアント側で破棄するため、サーバー側での処理は少ない
  // 必要に応じてブラックリスト管理などを実装
  res.status(200).json({ 
    success: true, 
    message: 'ログアウトしました。' 
  });
};