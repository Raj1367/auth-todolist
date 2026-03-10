import userModel from './Models/UserSchema';

const editTodoListPermission = async (userId: string) => {
  const user = await userModel.findById(userId);

  if (user?.role === 'ADMIN') {
    return true;
  }

  return false;
};

module.exports = editTodoListPermission;
