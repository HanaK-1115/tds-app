const sequelize = require('../config/db');
const Users = require('./Users');
const PaidLeaveManagement = require('./PaidLeaveManagement');
const Departments = require('./reference/Departments');
const Roles = require('./reference/Roles');

// ユーザーと部署のリレーション
Users.belongsTo(Departments, { foreignKey: 'departmentId', as: 'department' });
Departments.hasMany(Users, { foreignKey: 'departmentId', as: 'users' });

// ユーザーと役職のリレーション
Users.belongsTo(Roles, { foreignKey: 'roleId', as: 'role' });
Roles.hasMany(Users, { foreignKey: 'roleId', as: 'users' });

module.exports = {
  sequelize,
  Users,
  PaidLeaveManagement,
  Departments,
  Roles
};