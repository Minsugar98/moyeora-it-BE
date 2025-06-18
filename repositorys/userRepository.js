import prisma from '../config/prisma.js';
import bcrypt from 'bcrypt';
import { sendEmailAuth } from '../config/smtp.js';

const createUser = async (email, password) => {
  if (!email || !password) {
    throw new Error('이메일과 비밀번호를 입력해주세요.');
  }
  if (password.length < 8) {
    throw new Error('비밀번호는 8자 이상으로 입력해주세요.');
  }
  if (!email.includes('@')) {
    throw new Error('이메일 형식이 올바르지 않습니다.');
  }
  const user = await prisma.user.findUnique({
    where: { email },
  });
  if (user) {
    throw new Error('이미 존재하는 이메일 입니다.');
  }
  const newUser = await prisma.user.create({
    data: { email, password },
  });
  return newUser;
};

const deleteUser = async (userId) => {
  const user = await prisma.user.update({
    where: { id: userId },
    data: { is_deleted: true },
  });
  return user;
};

const getUserInfo = async (userId) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      follower: {
        include: {
          following: {
            select: {
              id: true,
              email: true,
              nickname: true,
              profile_image: true,
            },
          },
        },
      },
      following: {
        include: {
          follower: {
            select: {
              id: true,
              email: true,
              nickname: true,
              profile_image: true,
            },
          },
        },
      },
      group: true,
      waiting_list: true,
      bookmark: true,
      reply: true,
      rated_ratings: {
        select: {
          rating: true,
        },
      },
    },
  });

  if (!user) {
    throw new Error('존재하지 않는 유저입니다.');
  }

  const ratings = user.rated_ratings.map((r) => r.rating);
  const averageRating =
    ratings.length > 0
      ? Math.round((ratings.reduce((a, b) => a + b, 0) / ratings.length) * 10) /
        10
      : 0;

  const { profile_image, follower, following, password, ...rest } = user;
  return {
    items: {
      ...rest,
      profileImage: profile_image,
      followers: user.following.map((f) => ({
        ...f.follower,
        profileImage: f.follower.profile_image,
      })),
      following: user.follower.map((f) => ({
        ...f.following,
        profileImage: f.following.profile_image,
      })),
    },
    averageRating,
  };
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
  if (newPassword || confirmPassword) {
    if (!newPassword || !confirmPassword) {
      throw new Error('새 비밀번호와 확인 비밀번호를 모두 입력해주세요.');
    }

    const currentUser = await prisma.user.findUnique({
      where: { id: id },
      select: { password: true },
    });

    if (!currentUser) {
      throw new Error('사용자를 찾을 수 없습니다.');
    }

    const isCurrentPasswordValid = await bcrypt.compare(
      confirmPassword,
      currentUser.password
    );

    if (!isCurrentPasswordValid) {
      throw new Error('현재 비밀번호가 일치하지 않습니다.');
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    newPassword = hashedNewPassword;
  }

  // skills 문자열을 배열로 변환
  const skillsArray = skills
    ? skills.split(',').map((skill) => parseInt(skill.trim()))
    : [];

  const updateData = {
    ...(nickname && { nickname }),
    ...(position && { position }),
    ...(skillsArray && { skills: skillsArray }),
    ...(newPassword && { password: newPassword }),
    ...(image && { profile_image: image }),
  };

  const user = await prisma.user.update({
    where: { id: id },
    data: updateData,
  });

  const { profile_image, ...rest } = user;
  return { ...rest, profileImage: profile_image };
};

const checkEmailAuth = async (email, authNum) => {
  const user = await prisma.user.findUnique({
    where: { email },
  });
  if (user.emailAuthentication !== authNum) {
    throw new Error('인증번호가 일치하지 않습니다.');
  }
  return user;
};

const login = async (email, password) => {
  const user = await prisma.user.findUnique({
    where: { email },
  });
  if (!user) {
    throw new Error('존재하지 않는 이메일입니다.');
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error('비밀번호가 일치하지 않습니다.');
  }
  return;
};

const getUserByEmail = async (email) => {
  const user = await prisma.user.findUnique({
    where: { email },
    select: {
      id: true,
      email: true,
    },
  });
  return user;
};

const getByUserId = async (userId) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      follower: {
        include: {
          following: {
            select: {
              id: true,
              email: true,
              nickname: true,
              profile_image: true,
            },
          },
        },
      },
      following: {
        include: {
          follower: {
            select: {
              id: true,
              email: true,
              nickname: true,
              profile_image: true,
            },
          },
        },
      },
      rated_ratings: {
        select: {
          rating: true,
        },
      },
    },
  });
  const ratings = user.rated_ratings.map((r) => r.rating);
  const averageRating =
    ratings.length > 0
      ? Math.round((ratings.reduce((a, b) => a + b, 0) / ratings.length) * 10) /
        10
      : 0;
  const { profile_image, follower, following, password, ...rest } = user;
  return {
    ...rest,
    profileImage: profile_image,
    averageRating,
    followers: user.following.map((f) => ({
      ...f.follower,
      profileImage: f.follower.profile_image,
    })),
    following: user.follower.map((f) => ({
      ...f.following,
      profileImage: f.following.profile_image,
    })),
  };
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
  const where = {
    users: {
      some: {
        id: userId,
      },
    },
    ...(skill && { skills: { has: skill } }),
    ...(position && { position }),
    ...(type && { type }),
    ...(status && { status }),
  };

  const queryOptions = {
    where,
    orderBy: {
      [sort]: order,
    },
    take: size,
    skip: cursor,
  };

  const group = await prisma.group.findMany(queryOptions);

  const hasNext = group.length === size;
  const nextCursor = hasNext ? cursor + size : null;

  return {
    items: group,
    cursor: nextCursor,
    hasNext,
  };
};

const checkEmail = async (email) => {
  const user = await prisma.user.findUnique({
    where: { email },
  });
  return user;
};

const resetPassword = async (email) => {
  try {
    const result = await prisma.$transaction(async (tx) => {
      const user = await tx.user.findUnique({
        where: { email },
      });
      if (!user) {
        throw new Error('존재하지 않는 이메일입니다.');
      }

      const newPassword = Math.random().toString(36).substring(2, 15);
      const hashedPassword = await bcrypt.hash(newPassword, 10);

      await sendEmailAuth(email, newPassword);

      await tx.user.update({
        where: { email },
        data: { password: hashedPassword },
      });

      return newPassword;
    });

    return result;
  } catch (error) {
    if (error.message === '존재하지 않는 이메일입니다.') {
      throw error;
    }
    throw new Error('비밀번호 재설정 중 오류가 발생했습니다.');
  }
};

const passwordChange = async (userId, newPassword, confirmPassword) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });
  if (!user) {
    throw new Error('존재하지 않는 유저입니다.');
  }

  const isCurrentPasswordValid = await bcrypt.compare(
    confirmPassword,
    user.password
  );
  if (!isCurrentPasswordValid) {
    throw new Error('현재 비밀번호가 일치하지 않습니다.');
  }
  const hashedPassword = await bcrypt.hash(newPassword, 10);
  await prisma.user.update({
    where: { id: userId },
    data: { password: hashedPassword },
  });
  return;
};

const profileImageDelete = async (userId) => {
  await prisma.user.update({
    where: { id: userId },
    data: { profile_image: null },
  });
  return;
};

export default {
  createUser,
  deleteUser,
  getUserInfo,
  editUserInfo,
  checkEmailAuth,
  login,
  getUserByEmail,
  getByUserId,
  getUserByEmail,
  getMyGroup,
  checkEmail,
  resetPassword,
  passwordChange,
  profileImageDelete,
};
