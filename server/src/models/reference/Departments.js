const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../../config/db');

// 部署マスターテーブルのモデル定義
const Departments = sequelize.define('Departments', {
  id: {
    // 部署ID（主キー）
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    // 部署名
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  }
}, {
  tableName: 'departments',
  timestamps: false // マスターテーブルなのでタイムスタンプは不要
});

module.exports = Departments;