import userRepository from '../repositorys/userRepository.js';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

const createUser = async (email, password) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await userRepository.createUser(email, hashedPassword);
  return user;
};

const deleteUser = async (userId) => {
  const user = await userRepository.deleteUser(userId);
  return user;
};

const getUserInfo = async (userId) => {
  const user = await userRepository.getUserInfo(userId);
  return user;
};

const editUserInfo = async (
  id,
  nickname,
  position,
  skills,
  newPassword,
  confirmPassword,
  image
) => {
  const user = await userRepository.editUserInfo(
    id,
    nickname,
    position,
    skills,
    newPassword,
    confirmPassword,
    image
  );
  return user;
};

const checkEmailAuth = async (email, authNum) => {
  const user = await userRepository.checkEmailAuth(email, authNum);
  return user;
};

const login = async (email, password) => {
  const user = await userRepository.login(email, password);
  return user;
};

const createAccessToken = async (user, type) => {
  const payload = {
    userId: user.id,
    email: user.email,
  };
  const option = { expiresIn: type ? '1w' : '3h' };
  return jwt.sign(payload, process.env.TOKEN_SECRET, option);
};

const getUserByEmail = async (email) => {
  const user = await userRepository.getUserByEmail(email);
  return user;
};

const getByUserId = async (userId) => {
  const user = await userRepository.getByUserId(userId);
  return user;
};

const getMyGroup = async (
  userId,
  sort,
  order,
  skill,
  position,
  type,
  status,
  size,
  cursor
) => {
  const group = await userRepository.getMyGroup(
    userId,
    sort,
    order,
    skill,
    position,
    type,
    status,
    size,
    cursor
  );
  return group;
};

const checkEmail = async (email) => {
  const user = await userRepository.checkEmail(email);
  return user;
};

const resetPassword = async (email) => {
  const user = await userRepository.resetPassword(email);
  return user;
};

const passwordChange = async (userId, newPassword, confirmPassword) => {
  const user = await userRepository.passwordChange(
    userId,
    newPassword,
    confirmPassword
  );
  return user;
};

const profileImageDelete = async (userId) => {
  const user = await userRepository.profileImageDelete(userId);
  return user;
};

export default {
  createUser,
  deleteUser,
  getUserInfo,
  editUserInfo,
  checkEmailAuth,
  login,
  getUserByEmail,
  createAccessToken,
  getByUserId,
  getMyGroup,
  checkEmail,
  resetPassword,
  passwordChange,
  profileImageDelete,
};
