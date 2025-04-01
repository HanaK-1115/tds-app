const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { Users, Departments, Roles } = require('../models');
const config = require('../config/config');

/**
 * ユーザー認証
 */
exports.authenticateUser = async (username, password) => {
  // ユーザー検索
  const user = await Users.findOne({ where: { username } });
  
  if (!user) {
    console.log(`ログイン失敗: ユーザー名 ${username} が見つかりません`);
    return { 
      success: false, 
      message: 'ユーザー名またはパスワードが正しくありません。' 
    };
  }
  
  console.log(`ユーザーが見つかりました: ID=${user.id}, 部署ID=${user.departmentId}, 役職ID=${user.roleId}`);
  
  // ハッシュの形式チェック
  if (!user.password.startsWith('$2b$') && !user.password.startsWith('$2a$')) {
    console.log('警告: パスワードハッシュが適切な形式ではありません');
  }
  
  // パスワード比較
  const isMatch = await bcrypt.compare(password, user.password);
  
  if (!isMatch) {
    console.log(`ログイン失敗: パスワードが一致しません (ユーザー名: ${username})`);
    return { 
      success: false, 
      message: 'ユーザー名またはパスワードが正しくありません。' 
    };
  }
  
  console.log(`パスワード認証成功: ユーザー名=${username}`);
  
  // 部署と役職の情報を取得
  const department = await Departments.findByPk(user.departmentId);
  const role = await Roles.findByPk(user.roleId);
  
  if (!department) {
    console.log(`警告: ユーザー(ID=${user.id})の部署(ID=${user.departmentId})が見つかりません`);
  }
  
  if (!role) {
    console.log(`警告: ユーザー(ID=${user.id})の役職(ID=${user.roleId})が見つかりません`);
  }
  
  // トークンに含めるペイロード
  const tokenPayload = { 
    id: user.id, 
    username: user.username,
    departmentId: user.departmentId,
    departmentName: department ? department.name : null,
    roleId: user.roleId,
    roleName: role ? role.name : null,
  };
  
  // クライアントに返すユーザー情報
  const userDetails = {
    id: user.id,
    username: user.username,
    lastName: user.lastName,
    firstName: user.firstName,
    department: department ? { id: department.id, name: department.name } : null,
    role: role ? { id: role.id, name: role.name } : null
  };
  
  return {
    success: true,
    tokenPayload,
    userDetails
  };
};

/**
 * JWTトークン検証
 */
exports.verifyJwtToken = async (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, config.jwt.secret, (err, decoded) => {
      if (err) {
        reject(err);
      } else {
        resolve(decoded);
      }
    });
  });
};

/**
 * ユーザー詳細情報取得
 */
exports.getUserDetails = async (userId) => {
  const user = await Users.findByPk(userId);
  
  if (!user) {
    return null;
  }
  
  // 関連データを取得
  const department = await Departments.findByPk(user.departmentId);
  const role = await Roles.findByPk(user.roleId);
  
  return {
    id: user.id,
    username: user.username,
    lastName: user.lastName,
    firstName: user.firstName,
    department: department ? { id: department.id, name: department.name } : null,
    role: role ? { id: role.id, name: role.name } : null
  };
};

/**
 * パスワードリセット開始
 */
exports.initiatePasswordReset = async (email) => {
  // メールアドレスからユーザーを検索する実装が必要
  // ...
  
  return { success: true };
};

/**
 * パスワードリセット完了
 */
exports.completePasswordReset = async (token, newPassword) => {
  // トークン検証とパスワード更新の実装が必要
  // ...
  
  return { success: true };
};