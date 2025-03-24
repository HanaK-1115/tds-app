const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../../config/db');

// 役割マスターテーブルのモデル定義
const Roles = sequelize.define('Roles', {
  id: {
    // 役割ID（主キー）
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    // 役割名
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  }
}, {
  tableName: 'roles',
  timestamps: false
});

module.exports = Roles;