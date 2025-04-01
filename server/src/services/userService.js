const { Users, Departments, Roles } = require('../models');

/**
 * 詳細情報付きの全ユーザー取得
 */
exports.getAllUsersWithDetails = async () => {
  const users = await Users.findAll({
    attributes: ['id', 'username', 'firstName', 'lastName', 'departmentId', 'roleId', 'createdAt', 'updatedAt'],
    include: [
      { model: Departments, attributes: ['id', 'name'] },
      { model: Roles, attributes: ['id', 'name'] }
    ]
  });
  
  return users.map(user => ({
    id: user.id,
    username: user.username,
    firstName: user.firstName,
    lastName: user.lastName,
    department: user.Department ? { id: user.Department.id, name: user.Department.name } : null,
    role: user.Role ? { id: user.Role.id, name: user.Role.name } : null,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt
  }));
};

/**
 * ID指定でユーザー詳細情報取得
 */
exports.getUserDetailsById = async (userId) => {
  const user = await Users.findByPk(userId, {
    attributes: ['id', 'username', 'firstName', 'lastName', 'departmentId', 'roleId', 'createdAt', 'updatedAt'],
    include: [
      { model: Departments, attributes: ['id', 'name'] },
      { model: Roles, attributes: ['id', 'name'] }
    ]
  });
  
  if (!user) {
    return null;
  }
  
  return {
    id: user.id,
    username: user.username,
    firstName: user.firstName,
    lastName: user.lastName,
    department: user.Department ? { id: user.Department.id, name: user.Department.name } : null,
    role: user.Role ? { id: user.Role.id, name: user.Role.name } : null,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt
  };
};