const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

// 有給休暇申請テーブルのモデル定義
const PaidLeaveApplication = sequelize.define('PaidLeaveApplication', {
  id: {
    // 有給休暇申請ID（主キー）
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: {
    // ユーザーID（Usersテーブルを参照）
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id',
    },
  },
  submissionDate: {
    // 申請日
    type: DataTypes.DATE,
    allowNull: false,
  },
  startDate: {
    // 有給休暇開始日
    type: DataTypes.DATE,
    allowNull: false,
  },
  endDate: {
    // 有給休暇終了日
    type: DataTypes.DATE,
    allowNull: false,
  },
  reason: {
    // 有給休暇理由
    type: DataTypes.STRING,
    allowNull: false,
  },
  approvalStatus: {
    // 承認ステータス（0: 未承認, 1: 承認, 2: 却下, 3: キャンセル）
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 2, // 承認待ち
  },
  lastUpdatedByUserId: {
    // 最終更新者のユーザーID（Usersテーブルを参照）
    type: DataTypes.INTEGER,
    allowNull: false,
  }
}, {
  tableName: 'paid_leave_applications',
  timestamps: false,
});

module.exports = PaidLeaveApplication;
