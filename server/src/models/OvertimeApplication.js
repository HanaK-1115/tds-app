const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Users = require('./Users');

const OvertimeApplication = sequelize.define('OvertimeApplication', {
  id: {
    // 残業申請ID（主キー）
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  userId: {
    // ユーザーID（Usersテーブルを参照）
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Users,
      key: 'id'
    },
    onDelete: 'CASCADE'
  },
  submissionDate: {
    // 申請日
    type: DataTypes.DATE,
    allowNull: false
  },
  overtimeDate: {
    // 残業日
    type: DataTypes.DATE,
    allowNull: false
  },
  startTime: {
    // 残業開始時刻
    type: DataTypes.TIME,
    allowNull: false
  },
  endTime: {
    // 残業終了時刻
    type: DataTypes.TIME,
    allowNull: false
  },
  reason: {
    // 残業理由
    type: DataTypes.STRING,
    allowNull: false
  },
  approvalStatus: {
    // 承認ステータス（0: 未承認, 1: 承認, 2: 却下, 3: キャンセル）
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0 // 未承認
  },
  lastUpdatedByUserId: {
    // 最終更新者のユーザーID（Usersテーブルを参照）
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'overtime_applications',
  timestamps: false
});

// リレーションの設定
Users.hasMany(OvertimeApplication, { foreignKey: 'userId', as: 'overtimeApplications' });
OvertimeApplication.belongsTo(Users, { foreignKey: 'userId', as: 'user' });

module.exports = OvertimeApplication;