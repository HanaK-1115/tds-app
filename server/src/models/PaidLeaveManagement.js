const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Users = require('./Users');

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
      model: Users,
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
    type: DataTypes.FLOAT,
    allowNull: false,
    defaultValue: 0,
    validate: {
      min: 0
    }
  }
}, {
  tableName: 'paid_leave_management',
  timestamps: true
});

Users.hasOne(PaidLeaveManagement, { foreignKey: 'userId' });
PaidLeaveManagement.belongsTo(Users, { foreignKey: 'userId' });

module.exports = PaidLeaveManagement;
