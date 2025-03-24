const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User');

// 有給休暇管理テーブルのモデル定義
const PaidLeaveManagement = sequelize.define('PaidLeaveManagement', {
  id: {
    // 有給休暇管理ID（主キー）
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  userId: {
    // ユーザーID（Usersテーブルを参照）
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id'
    },
    onDelete: 'CASCADE'
  },
  joinDate: {
    // 入社日
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  remainingLeaveDays: {
    // 残り有給休暇日数
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'paid_leaves_management',
  timestamps: false
});

User.hasOne(PaidLeaveManagement, { foreignKey: 'userId', as: 'paidLeaveManagement' });
PaidLeaveManagement.belongsTo(User, { foreignKey: 'userId', as: 'user' });

module.exports = PaidLeaveManagement;
