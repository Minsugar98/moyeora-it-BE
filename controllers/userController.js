import userService from '../services/userService.js';
// import { sendEmailAuth } from '../config/SMTP.js';
import {
  accessTokenOption,
  refreshTokenOption,
  clearAccessTokenOption,
  clearRefreshTokenOption,
} from '../config/cookie.js';

const signup = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userService.createUser(email, password);
    res
      .status(201)
      .json({ status: { success: true } }, { message: '회원가입 성공' });
  } catch (error) {
    res.status(500).json({
      status: { success: false, code: 500, message: error.message },
      message: '회원가입 실패',
    });
  }
};

//회원 탈퇴
const deleteUser = async (req, res) => {
  const { id: userId } = req.user;
  try {
    await userService.deleteUser(parseInt(userId));
    res.status(200).json({ status: { success: true } });
  } catch (error) {
    res.status(500).json({
      status: { success: false, code: 500, message: error.message },
      message: '회원탈퇴 실패',
    });
  }
};

const userInfo = async (req, res) => {
  const { id: userId } = req.user;
  try {
    const user = await userService.getUserInfo(userId);
    res.status(200).json({ status: { success: true }, items: user });
  } catch (error) {
    res.status(500).json({
      status: { success: false, code: 500, message: error.message },
    });
  }
};

const getByUserId = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await userService.getByUserId(parseInt(userId));
    res.status(200).json({ status: { success: true }, data: user });
  } catch (error) {
    res.status(500).json({
      status: { success: false, code: 500, message: error.message },
    });
  }
};

const editUserInfo = async (req, res) => {
  try {
    const { id } = req.user;
    const image = req.file ? req.file.location : undefined;
    const { nickname, position, newPassword, confirmPassword, skills } =
      req.body;

    const user = await userService.editUserInfo(
      parseInt(id),
      nickname,
      parseInt(position),
      skills,
      newPassword,
      confirmPassword,
      image
    );
    res.status(200).json({ status: { success: true }, data: user });
  } catch (error) {
    res.status(500).json({
      status: { success: false, code: 500, message: error.message },
    });
  }
};

const FindEmailAuth = async (req, res) => {
  const { email } = req.body;
  try {
    // const result = await sendEmailAuth(email);
    res.status(200).json({ status: { success: true } });
  } catch (error) {
    res.status(500).json({
      status: { success: false, code: 500, message: error.message },
    });
  }
};

const checkEmailAuth = async (req, res) => {
  const { email, authNum } = req.body;
  try {
    await userService.checkEmailAuth(email, authNum);
    res.status(200).json({ status: { success: true } });
  } catch (error) {
    res.status(500).json({
      status: { success: false, code: 500, message: error.message },
    });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    await userService.login(email, password);
    const user = await userService.getUserByEmail(email);
    const accessToken = await userService.createAccessToken(user);
    const refreshToken = await userService.createAccessToken(user, 'refresh');

    res.cookie('accessToken', accessToken, accessTokenOption);
    res.cookie('refreshToken', refreshToken, refreshTokenOption);
    res.status(200).json({ status: { success: true }, message: '로그인 성공' });
  } catch (error) {
    res.status(500).json({
      status: { success: false, code: 500, message: error.message },
    });
  }
};

const logout = async (req, res) => {
  try {
    res.cookie('accessToken', null, clearAccessTokenOption);
    res.cookie('refreshToken', null, clearRefreshTokenOption);
    res.status(200).json({ status: { success: true } });
  } catch (error) {
    res.status(500).json({
      status: { success: false, code: 500, message: error.message },
    });
  }
};

const refreshAccessToken = async (req, res) => {
  const { id, email } = req.user;
  const user = { id, email };
  try {
    const newAccessToken = await userService.createAccessToken(user);
    res.cookie('accessToken', newAccessToken, accessTokenOption);
    res.status(200).json({ status: { success: true } });
  } catch (error) {
    res.status(500).json({
      status: { success: false, code: 500, message: error.message },
    });
  }
};

const getMyGroup = async (req, res) => {
  const { id: userId } = req.user;
  const { sort, order, skill, position, type, status, size, cursor } =
    req.query;
  try {
    const group = await userService.getMyGroup(
      parseInt(userId),
      sort || 'created_at',
      order || 'desc',
      skill,
      position,
      type,
      status,
      parseInt(size) || 10,
      parseInt(cursor) || 0
    );
    res.status(200).json({ status: { success: true }, items: group });
  } catch (error) {
    res.status(500).json({
      status: { success: false, code: 500, message: error.message },
    });
  }
};

const checkEmail = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await userService.checkEmail(email);
    if (user) {
      res.status(409).json({
        status: { success: false, code: 200, message: '이메일이 중복됩니다.' },
      });
    } else {
      res.status(200).json({
        status: {
          success: true,
          code: 200,
          message: '이메일이 중복되지 않습니다.',
        },
      });
    }
  } catch (error) {
    res.status(500).json({
      status: { success: false, code: 500, message: error.message },
    });
  }
};

const resetPassword = async (req, res) => {
  const { email } = req.body;
  try {
    await userService.resetPassword(email);
    res.status(200).json({ status: { success: true } });
  } catch (error) {
    res.status(500).json({
      status: { success: false, code: 500, message: error.message },
    });
  }
};

// const redisToLogin = async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     await userService.redisToLogin(email, password);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

const passwordChange = async (req, res) => {
  const { id: userId } = req.user;
  const { newPassword, confirmPassword } = req.body;
  try {
    await userService.passwordChange(userId, newPassword, confirmPassword);
    res.status(200).json({ status: { success: true } });
  } catch (error) {
    res.status(500).json({
      status: { success: false, code: 500, message: error.message },
    });
  }
};

const profileImageDelete = async (req, res) => {
  const { id: userId } = req.user;
  try {
    await userService.profileImageDelete(userId);
    res.status(200).json({ status: { success: true } });
  } catch (error) {
    res.status(500).json({
      status: { success: false, code: 500, message: error.message },
    });
  }
};

export default {
  signup,
  deleteUser,
  userInfo,
  getByUserId,
  editUserInfo,
  login,
  refreshAccessToken,
  FindEmailAuth,
  checkEmailAuth,
  logout,
  getMyGroup,
  checkEmail,
  resetPassword,
  passwordChange,
  profileImageDelete,
};
