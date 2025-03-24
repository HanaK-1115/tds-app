const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

// 休日出勤申請テーブルのモデル定義
const HolidayWorkApplication = sequelize.define('HolidayWorkApplication', {
  id: {
    // 休日出勤申請ID（主キー）
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
  workDate: {
    // 休日出勤日
    type: DataTypes.DATE,
    allowNull: false,
  },
  reason: {
    // 休日出勤理由
    type: DataTypes.STRING,
    allowNull: false,
  },
  approvalStatus: {
    // 承認ステータス（0: 未承認, 1: 承認, 2: 却下）
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 2,
  },
  compensatoryDate: {
    // 振替休日
    type: DataTypes.DATE,
    allowNull: true,
  },
  lastUpdatedByUserId: {
    // 最終更新者のユーザーID（Usersテーブルを参照）
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id',
    },
  },
}, {
  tableName: 'holiday_work_applications',
  timestamps: false, // createdAt, updatedAt を無効化
});

module.exports = HolidayWorkApplication;
