const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const PaidLeaveApplication = require('./PaidLeaveApplication'); // PaidLeaveApplicationモデルをインポート
const bcrypt = require('bcrypt');
const Departments = require('./reference/Departments');
const Roles = require('./reference/Roles');

// ユーザーテーブルのモデル定義
const Users = sequelize.define('Users', {
  id: {
    // ユーザーID（主キー）
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  username: {
    // ユーザー名（ログインIDとして使用）
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    // パスワード（ハッシュ化されて保存）
    type: DataTypes.STRING,
    allowNull: false
  },
  departmentId: {
    // 部署ID（Departmentsテーブルを参照）
    type: DataTypes.INTEGER,
    references: {
      model: Departments,
      key: 'id'
    },
    allowNull: false
  },
  lastName: {
    // 姓
    type: DataTypes.STRING,
    allowNull: false
  },
  firstName: {
    // 名
    type: DataTypes.STRING,
    allowNull: false
  },
  role: {
    // 役職（Rolesテーブルを参照）
    type: DataTypes.INTEGER,
    references: {
      model: Roles,
      key: 'id'
    },
    allowNull: false
  }
}, {
  tableName: 'users',
  timestamps: true
});

// パスワードをハッシュ化して保存
Users.beforeCreate(async (users) => {
  const salt = await bcrypt.genSalt(10);
  users.password = await bcrypt.hash(users.password, salt);
});

Users.beforeUpdate(async (users) => {
  if (users.changed('password')) {
    const salt = await bcrypt.genSalt(10);
    users.password = await bcrypt.hash(users.password, salt);
  }
});

Users.hasMany(PaidLeaveApplication, { foreignKey: 'userId' });
PaidLeaveApplication.belongsTo(Users, { foreignKey: 'userId' });

// リレーションを定義
Users.belongsTo(Departments, { foreignKey: 'departmentId' });
Departments.hasMany(Users, { foreignKey: 'departmentId' });

Users.belongsTo(Roles, { foreignKey: 'roleId' });
Roles.hasMany(Users, { foreignKey: 'roleId' });

module.exports = Users;
