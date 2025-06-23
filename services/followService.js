import followRepository from '../repositorys/followRepository.js';
import userRepository from '../repositorys/userRepository.js';

const getFollowers = async (userId, targetUserId, size, cursor, name) => {
  await userRepository.getUserInfo(targetUserId);
  const followers = await followRepository.getFollowers(
    userId,
    targetUserId,
    size,
    cursor,
    name
  );
  return followers;
};

const getFollowing = async (userId, targetUserId, size, cursor, name) => {
  await userRepository.getUserInfo(targetUserId);
  const following = await followRepository.getFollowing(
    userId,
    targetUserId,
    size,
    cursor,
    name
  );
  return following;
};

const createFollow = async (userId, targetUserId) => {
  const follow = await followRepository.createFollow(userId, targetUserId);
  return follow;
};

const deleteFollow = async (userId, targetUserId) => {
  const follow = await followRepository.deleteFollow(userId, targetUserId);
  return follow;
};

const deleteFollower = async (userId, targetUserId) => {
  const follow = await followRepository.deleteFollower(userId, targetUserId);
  return follow;
};

const getFollowersCount = async (userId) => {
  const followersCount = await followRepository.getFollowersCount(userId);
  return followersCount;
};

const getFollowingCount = async (userId) => {
  const followingCount = await followRepository.getFollowingCount(userId);
  return followingCount;
};

const getSpringFollowers = async (userId) => {
  const followers = await followRepository.getSpringFollowers(userId);
  return followers;
};

const getSpringFollowing = async (userId) => {
  const following = await followRepository.getSpringFollowing(userId);
  return following;
};

export default {
  getFollowers,
  getFollowing,
  createFollow,
  deleteFollow,
  deleteFollower,
  getFollowersCount,
  getFollowingCount,
  getSpringFollowers,
  getSpringFollowing,
};
