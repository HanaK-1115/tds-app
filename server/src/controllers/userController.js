const { Users, PaidLeaveManagement } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config/config');
const { Op } = require('sequelize');
const sequelize = require('../config/db'); // database から db に変更

/**
 * ユーザー登録
 */
exports.register = async (req, res) => {
  const transaction = await sequelize.transaction();

  try {
    const {
      username,
      password,
      firstName,
      lastName,
      departmentId,
      join_date,
      remaining_leave_days,
      roleId
    } = req.body;

    // 必須フィールドの検証
    if (!username || !password || !firstName || !join_date || remaining_leave_days === undefined || !lastName) {
      return res.status(400).json({
        success: false,
        message: 'すべての必須フィールドを入力してください'
      });
    }

    // ユーザー名の重複チェック
    const existingUser = await Users.findOne({
      where: { username },
      transaction
    });

    if (existingUser) {
      await transaction.rollback();
      return res.status(400).json({
        success: false,
        message: 'このユーザー名は既に使用されています'
      });
    }

    // ユーザー登録
    const newUser = await Users.create({
      username,
      password,
      firstName,
      lastName,
      departmentId,
      roleId
    }, { transaction });

    // 有給休暇管理情報の作成
    await PaidLeaveManagement.create({
      userId: newUser.id,
      joinDate: join_date,
      remainingLeaveDays: remaining_leave_days
    }, { transaction });

    await transaction.commit();

    res.status(201).json({
      success: true,
      message: 'ユーザーが正常に登録されました',
      userId: newUser.id
    });
  } catch (error) {
    await transaction.rollback();
    console.error('ユーザー登録エラー:', error);
    res.status(500).json({
      success: false,
      message: 'ユーザー登録中にエラーが発生しました'
    });
  }
};

/**
 * ユーザー一覧取得
 */
exports.getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsersWithDetails();

    res.status(200).json({
      success: true,
      count: users.length,
      users
    });
  } catch (error) {
    console.error('ユーザー一覧取得エラー:', error);
    res.status(500).json({
      message: 'ユーザー一覧の取得中にエラーが発生しました。'
    });
  }
};

/**
 * 特定ユーザーの取得
 */
exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await userService.getUserDetailsById(id);

    if (!user) {
      return res.status(404).json({
        message: '指定されたユーザーが見つかりません。'
      });
    }

    res.status(200).json({
      success: true,
      user
    });
  } catch (error) {
    console.error('ユーザー取得エラー:', error);
    res.status(500).json({
      message: 'ユーザー情報の取得中にエラーが発生しました。'
    });
  }
};

/**
 * ユーザー情報更新
 */
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    // ID存在確認
    const user = await Users.findByPk(id);
    if (!user) {
      return res.status(404).json({
        message: '指定されたユーザーが見つかりません。'
      });
    }

    // ユーザー名の重複チェック（変更された場合のみ）
    if (updateData.username && updateData.username !== user.username) {
      const existingUser = await Users.findOne({
        where: { username: updateData.username }
      });

      if (existingUser) {
        return res.status(400).json({
          message: 'このユーザー名は既に使用されています。'
        });
      }
    }

    // 更新処理
    await user.update(updateData);

    // 更新後の完全なユーザー情報を取得
    const updatedUser = await userService.getUserDetailsById(id);

    res.status(200).json({
      success: true,
      message: 'ユーザー情報が正常に更新されました。',
      user: updatedUser
    });
  } catch (error) {
    console.error('ユーザー更新エラー:', error);
    res.status(500).json({
      message: 'ユーザー情報の更新中にエラーが発生しました。'
    });
  }
};

/**
 * パスワード変更
 */
exports.changePassword = async (req, res) => {
  try {
    const { id } = req.params;
    const { currentPassword, newPassword } = req.body;

    // ユーザー存在確認
    const user = await Users.findByPk(id);
    if (!user) {
      return res.status(404).json({
        message: '指定されたユーザーが見つかりません。'
      });
    }

    // 現在のパスワード確認
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(401).json({
        message: '現在のパスワードが正しくありません。'
      });
    }

    // パスワード更新（モデルフックによりハッシュ化される）
    user.password = newPassword;
    await user.save();

    res.status(200).json({
      success: true,
      message: 'パスワードが正常に変更されました。'
    });
  } catch (error) {
    console.error('パスワード変更エラー:', error);
    res.status(500).json({
      message: 'パスワードの変更中にエラーが発生しました。'
    });
  }
};

/**
 * ユーザー削除
 */
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    // ユーザー存在確認
    const user = await Users.findByPk(id);
    if (!user) {
      return res.status(404).json({
        message: '指定されたユーザーが見つかりません。'
      });
    }

    // 削除処理
    await user.destroy();

    res.status(200).json({
      success: true,
      message: 'ユーザーが正常に削除されました。'
    });
  } catch (error) {
    console.error('ユーザー削除エラー:', error);
    res.status(500).json({
      message: 'ユーザーの削除中にエラーが発生しました。'
    });
  }
};

/**
 * 自分のプロファイル取得
 */
exports.getProfile = async (req, res) => {
  try {
    const userId = req.user.id; // JWTミドルウェアで設定されたユーザーID

    const user = await userService.getUserDetailsById(userId);

    if (!user) {
      return res.status(404).json({
        message: 'プロファイル情報が見つかりません。'
      });
    }

    res.status(200).json({
      success: true,
      user
    });
  } catch (error) {
    console.error('プロファイル取得エラー:', error);
    res.status(500).json({
      message: 'プロファイルの取得中にエラーが発生しました。'
    });
  }
};

/**
 * 自分のプロファイル更新
 */
exports.updateProfile = async (req, res) => {
  try {
    const userId = req.user.id; // JWTミドルウェアで設定されたユーザーID
    const updateData = req.body;

    // セキュリティのため、重要な項目は更新から除外
    delete updateData.roleId; // 役職は管理者のみ変更可能
    delete updateData.password; // パスワードは専用エンドポイントで変更

    // ユーザー存在確認
    const user = await Users.findByPk(userId);
    if (!user) {
      return res.status(404).json({
        message: 'プロファイル情報が見つかりません。'
      });
    }

    // 更新処理
    await user.update(updateData);

    // 更新後の完全なユーザー情報を取得
    const updatedUser = await userService.getUserDetailsById(userId);

    res.status(200).json({
      success: true,
      message: 'プロファイルが正常に更新されました。',
      user: updatedUser
    });
  } catch (error) {
    console.error('プロファイル更新エラー:', error);
    res.status(500).json({
      message: 'プロファイルの更新中にエラーが発生しました。'
    });
  }
};