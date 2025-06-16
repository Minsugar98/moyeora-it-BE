import express from 'express';
import userController from '../controllers/userController.js';
import jwtToken from '../middleware/jwtToken.js';
import { uploadImage } from '../middleware/imageUpload.js';

const router = express.Router();
/**
 * @swagger
 * /api/v1/user/signup:
 *   post:
 *     tags:
 *       - User
 *     summary: 회원가입
 *     description: 새로운 사용자를 등록합니다.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: user@example.com
 *                 description: 사용자 이메일
 *               password:
 *                 type: string
 *                 format: password
 *                 example: password123
 *                 description: 사용자 비밀번호 (8자 이상)
 *     responses:
 *       201:
 *         description: 회원가입 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: object
 *                   properties:
 *                     success:
 *                       type: boolean
 *                       example: true
 *                 message:
 *                   type: string
 *                   example: 회원가입 성공
 *       400:
 *         description: 잘못된 요청
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: object
 *                   properties:
 *                     success:
 *                       type: boolean
 *                       example: false
 *                     code:
 *                       type: integer
 *                       example: 400
 *                     message:
 *                       type: string
 *                       example: 이메일과 비밀번호를 입력해주세요.
 *                 message:
 *                   type: string
 *                   example: 회원가입 실패
 *       409:
 *         description: 이메일 중복
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: object
 *                   properties:
 *                     success:
 *                       type: boolean
 *                       example: false
 *                     code:
 *                       type: integer
 *                       example: 409
 *                     message:
 *                       type: string
 *                       example: 이미 존재하는 이메일 입니다.
 *                 message:
 *                   type: string
 *                   example: 회원가입 실패
 *       500:
 *         description: 서버 에러
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: object
 *                   properties:
 *                     success:
 *                       type: boolean
 *                       example: false
 *                     code:
 *                       type: integer
 *                       example: 500
 *                     message:
 *                       type: string
 *                       example: 서버 에러가 발생했습니다.
 *                 message:
 *                   type: string
 *                   example: 회원가입 실패
 */
router.post('/signup', userController.signup); // 테스트완

/**
 * @swagger
 * /api/v1/user/email-auth:
 *   post:
 *     tags:
 *       - User
 *     summary: 이메일 인증 요청
 *     description: 사용자의 이메일로 인증 메일을 발송합니다.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: user@example.com
 *                 description: 인증을 받을 이메일 주소
 *     responses:
 *       200:
 *         description: 이메일 인증 메일 발송 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: object
 *                   properties:
 *                     success:
 *                       type: boolean
 *                       example: true
 *       400:
 *         description: 잘못된 요청
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: object
 *                   properties:
 *                     success:
 *                       type: boolean
 *                       example: false
 *                     code:
 *                       type: integer
 *                       example: 400
 *                     message:
 *                       type: string
 *                       example: 이메일을 입력해주세요.
 *       500:
 *         description: 서버 에러
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: object
 *                   properties:
 *                     success:
 *                       type: boolean
 *                       example: false
 *                     code:
 *                       type: integer
 *                       example: 500
 *                     message:
 *                       type: string
 *                       example: 메일 전송에 실패하였습니다.
 */
router.post('/email-auth', userController.FindEmailAuth);

/**
 * @swagger
 * /api/v1/user/login:
 *   post:
 *     tags:
 *       - User
 *     summary: 로그인
 *     description: 사용자 로그인을 수행합니다.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: user@example.com
 *                 description: 사용자 이메일
 *               password:
 *                 type: string
 *                 format: password
 *                 example: password123
 *                 description: 사용자 비밀번호
 *     responses:
 *       200:
 *         description: 로그인 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: object
 *                   properties:
 *                     success:
 *                       type: boolean
 *                       example: true
 *                 message:
 *                   type: string
 *                   example: 로그인 성공
 *         headers:
 *           Set-Cookie:
 *             schema:
 *               type: string
 *               example: accessToken=eyJhbGciOiJIUzI1NiIs...; HttpOnly; Secure; SameSite=Strict
 *       401:
 *         description: 인증 실패
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: object
 *                   properties:
 *                     success:
 *                       type: boolean
 *                       example: false
 *                     code:
 *                       type: integer
 *                       example: 401
 *                     message:
 *                       type: string
 *                       example: 존재하지 않는 이메일입니다.
 *       500:
 *         description: 서버 에러
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: object
 *                   properties:
 *                     success:
 *                       type: boolean
 *                       example: false
 *                     code:
 *                       type: integer
 *                       example: 500
 *                     message:
 *                       type: string
 *                       example: 서버 에러가 발생했습니다.
 */
router.post('/login', userController.login);
/**
 * @swagger
 * /api/v1/user/check-email-auth:
 *   post:
 *     tags:
 *       - User
 *     summary: 이메일 인증번호 확인
 *     description: 이메일과 인증번호를 받아 인증을 완료합니다.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - authNum
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: user@example.com
 *                 description: 인증을 받을 이메일 주소
 *               authNum:
 *                 type: string
 *                 example: "123456"
 *                 description: 이메일로 받은 인증번호
 *     responses:
 *       200:
 *         description: 이메일 인증 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: object
 *                   properties:
 *                     success:
 *                       type: boolean
 *                       example: true
 *       400:
 *         description: 잘못된 요청
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: object
 *                   properties:
 *                     success:
 *                       type: boolean
 *                       example: false
 *                     code:
 *                       type: integer
 *                       example: 400
 *                     message:
 *                       type: string
 *                       example: 이메일과 인증번호를 입력해주세요.
 *       401:
 *         description: 인증 실패
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: object
 *                   properties:
 *                     success:
 *                       type: boolean
 *                       example: false
 *                     code:
 *                       type: integer
 *                       example: 401
 *                     message:
 *                       type: string
 *                       example: 인증번호가 일치하지 않습니다.
 *       500:
 *         description: 서버 에러
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: object
 *                   properties:
 *                     success:
 *                       type: boolean
 *                       example: false
 *                     code:
 *                       type: integer
 *                       example: 500
 *                     message:
 *                       type: string
 *                       example: 서버 에러가 발생했습니다.
 */
router.post('/check-email-auth', userController.checkEmailAuth);

/**
 * @swagger
 * /api/v1/user/logout:
 *   post:
 *     tags:
 *       - User
 *     summary: 로그아웃
 *     description: 사용자 로그아웃을 수행합니다. (쿠키의 토큰이 삭제됩니다)
 *     responses:
 *       200:
 *         description: 로그아웃 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: 로그아웃 성공
 *       500:
 *         description: 서버 에러
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: 에러 메시지
 */
router.post('/logout', userController.logout);

/**
 * @swagger
 * /api/v1/user/info:
 *   get:
 *     tags:
 *       - User
 *     summary: 내 정보 조회
 *     description: 인증된 사용자의 정보를 조회합니다.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: 유저 정보 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     items:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: integer
 *                           example: 1
 *                         email:
 *                           type: string
 *                           example: "user@example.com"
 *                         nickname:
 *                           type: string
 *                           example: "홍길동"
 *                         profile_image:
 *                           type: string
 *                           example: "https://example.com/profile.jpg"
 *                         position:
 *                           type: string
 *                           example: "프론트엔드 개발자"
 *                         skills:
 *                           type: array
 *                           items:
 *                             type: string
 *                           example: ["JavaScript", "React", "TypeScript"]
 *                         group:
 *                           type: string
 *                           example: "개발팀"
 *                         follower:
 *                           type: array
 *                           items:
 *                             type: object
 *                         following:
 *                           type: array
 *                           items:
 *                             type: object
 *                         waiting_list:
 *                           type: array
 *                           items:
 *                             type: object
 *                         bookmark:
 *                           type: array
 *                           items:
 *                             type: object
 *                         reply:
 *                           type: array
 *                           items:
 *                             type: object
 *                         _count:
 *                           type: object
 *                           properties:
 *                             follower:
 *                               type: integer
 *                               example: 10
 *                             following:
 *                               type: integer
 *                               example: 5
 *                             waiting_list:
 *                               type: integer
 *                               example: 2
 *                             bookmark:
 *                               type: integer
 *                               example: 3
 *                             reply:
 *                               type: integer
 *                               example: 8
 *                     averageRating:
 *                       type: number
 *                       format: float
 *                       example: 4.5
 *       500:
 *         description: 서버 에러
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "서버 에러가 발생했습니다."
 */
router.get('/info', jwtToken.accessVerifyToken, userController.userInfo);

router.get('/my-group', jwtToken.accessVerifyToken, userController.getMyGroup);

/**
 * @swagger
 * /api/v1/user/{userId}:
 *   get:
 *     tags:
 *       - User
 *     summary: 특정 유저 정보 조회
 *     description: userId로 특정 사용자의 정보를 조회합니다.
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *         description: 조회할 유저의 ID
 *     responses:
 *       200:
 *         description: 유저 정보 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     email:
 *                       type: string
 *                       example: "user@example.com"
 *                     nickname:
 *                       type: string
 *                       example: "홍길동"
 *                     profile_image:
 *                       type: string
 *                       example: "https://example.com/profile.jpg"
 *                     position:
 *                       type: string
 *                       example: "프론트엔드 개발자"
 *                     skills:
 *                       type: array
 *                       items:
 *                         type: string
 *                       example: ["JavaScript", "React", "TypeScript"]
 *                     follower:
 *                       type: array
 *                       items:
 *                         type: object
 *                     following:
 *                       type: array
 *                       items:
 *                         type: object
 *                     _count:
 *                       type: object
 *                       properties:
 *                         follower:
 *                           type: integer
 *                           example: 10
 *                         following:
 *                           type: integer
 *                           example: 5
 *                     rated_ratings:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           rating:
 *                             type: number
 *                             example: 4.5
 *       500:
 *         description: 서버 에러
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "서버 에러가 발생했습니다."
 */
router.get('/:userId', userController.getByUserId);

/**
 * @swagger
 * /api/v1/user/delete:
 *   delete:
 *     tags:
 *       - User
 *     summary: 회원 탈퇴
 *     description: 인증된 사용자가 회원 탈퇴를 진행합니다.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       204:
 *         description: 회원 탈퇴 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: object
 *                   properties:
 *                     success:
 *                       type: boolean
 *                       example: true
 *                 message:
 *                   type: string
 *                   example: 회원탈퇴 성공
 *       401:
 *         description: 인증 실패
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: object
 *                   properties:
 *                     success:
 *                       type: boolean
 *                       example: false
 *                     code:
 *                       type: integer
 *                       example: 401
 *                     message:
 *                       type: string
 *                       example: 인증에 실패했습니다.
 *       500:
 *         description: 서버 에러
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: object
 *                   properties:
 *                     success:
 *                       type: boolean
 *                       example: false
 *                     code:
 *                       type: integer
 *                       example: 500
 *                     message:
 *                       type: string
 *                       example: 회원탈퇴 실패
 */
router.delete('/delete', jwtToken.accessVerifyToken, userController.deleteUser);

/**
 * @swagger
 * /api/v1/user/edit:
 *   patch:
 *     tags:
 *       - User
 *     summary: 내 정보 수정
 *     description: 인증된 사용자가 자신의 정보를 수정합니다. (이미지, 닉네임, 포지션, skills, 비밀번호 변경 등)
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: 프로필 이미지 파일
 *               nickname:
 *                 type: string
 *                 example: 홍길동
 *                 description: 닉네임
 *               position:
 *                 type: Int
 *                 example: 1
 *                 description: 포지션
 *               skills:
 *                 type: Int
 *                 example: 1,2,3,4
 *                 description: 쉼표(,)로 구분된 기술 스택 문자열 (1,2,3,4중 선택)
 *               newPassword:
 *                 type: string
 *                 format: password
 *                 example:
 *                 description: 새 비밀번호(변경 시)
 *               confirmPassword:
 *                 type: string
 *                 format: password
 *                 example:
 *                 description: 기존 비밀번호 확인(변경 시)
 *     responses:
 *       200:
 *         description: 유저 정보 수정 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: object
 *                   properties:
 *                     success:
 *                       type: boolean
 *                       example: true
 *       400:
 *         description: 잘못된 요청
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: object
 *                   properties:
 *                     success:
 *                       type: boolean
 *                       example: false
 *                     code:
 *                       type: integer
 *                       example: 400
 *                     message:
 *                       type: string
 *                       example: 비밀번호가 일치하지 않습니다.
 *       401:
 *         description: 인증 실패
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: object
 *                   properties:
 *                     success:
 *                       type: boolean
 *                       example: false
 *                     code:
 *                       type: integer
 *                       example: 401
 *                     message:
 *                       type: string
 *                       example: 인증에 실패했습니다.
 *       500:
 *         description: 서버 에러
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: object
 *                   properties:
 *                     success:
 *                       type: boolean
 *                       example: false
 *                     code:
 *                       type: integer
 *                       example: 500
 *                     message:
 *                       type: string
 *                       example: 서버 에러가 발생했습니다.
 */
router.patch(
  '/edit',
  jwtToken.accessVerifyToken,
  uploadImage('image', false),
  userController.editUserInfo
);

/**
 * @swagger
 * /api/v1/user/refresh:
 *   post:
 *     tags:
 *       - User
 *     summary: 액세스 토큰 갱신
 *     description: 리프레시 토큰을 이용해 새로운 액세스 토큰을 발급받습니다.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: 액세스 토큰 갱신 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: 액세스 토큰 갱신 성공
 *       500:
 *         description: 서버 에러
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: 에러 메시지
 */
router.post(
  '/refresh',
  jwtToken.refreshVerifyToken,
  userController.refreshAccessToken
);

/**
 * @swagger
 * /api/v1/user/check-email:
 *   post:
 *     tags:
 *       - User
 *     summary: 이메일 중복 체크
 *     description: 회원가입 시 이메일 중복 여부를 확인합니다.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "user@example.com"
 *                 description: 중복 체크할 이메일 주소
 *     responses:
 *       200:
 *         description: 이메일 중복되지 않음
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: object
 *                   properties:
 *                     success:
 *                       type: boolean
 *                       example: true
 *                     code:
 *                       type: integer
 *                       example: 200
 *                     message:
 *                       type: string
 *                       example: "이메일이 중복되지 않습니다."
 *       409:
 *         description: 이메일 중복
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: object
 *                   properties:
 *                     success:
 *                       type: boolean
 *                       example: false
 *                     code:
 *                       type: integer
 *                       example: 409
 *                     message:
 *                       type: string
 *                       example: "이메일이 중복됩니다."
 *       500:
 *         description: 서버 에러
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: object
 *                   properties:
 *                     success:
 *                       type: boolean
 *                       example: false
 *                     code:
 *                       type: integer
 *                       example: 500
 *                     message:
 *                       type: string
 *                       example: "서버 에러가 발생했습니다."
 */
router.post('/check-email', userController.checkEmail);

/**
 * @swagger
 * /api/v1/user/reset-password:
 *   post:
 *     tags:
 *       - User
 *     summary: 비밀번호 재설정
 *     description: 사용자의 이메일로 새로운 임시 비밀번호를 발급하고 이메일로 전송합니다.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: 비밀번호를 재설정할 사용자의 이메일
 *                 example: "user@example.com"
 *     responses:
 *       200:
 *         description: 비밀번호 재설정 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: object
 *                   properties:
 *                     success:
 *                       type: boolean
 *                       example: true
 *       404:
 *         description: 존재하지 않는 이메일
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: object
 *                   properties:
 *                     success:
 *                       type: boolean
 *                       example: false
 *                     code:
 *                       type: integer
 *                       example: 404
 *                     message:
 *                       type: string
 *                       example: "존재하지 않는 이메일입니다."
 *       500:
 *         description: 서버 에러
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: object
 *                   properties:
 *                     success:
 *                       type: boolean
 *                       example: false
 *                     code:
 *                       type: integer
 *                       example: 500
 *                     message:
 *                       type: string
 *                       example: "서버 에러가 발생했습니다."
 */
router.post('/reset-password', userController.resetPassword);

/**
 * @swagger
 * /api/v1/user/password-change:
 *   patch:
 *     tags:
 *       - User
 *     summary: 비밀번호 변경
 *     description: 사용자의 비밀번호를 변경합니다.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - newPassword
 *               - confirmPassword
 *             properties:
 *               newPassword:
 *                 type: string
 *                 description: 새로운 비밀번호
 *                 example: "newPassword123!"
 *               confirmPassword:
 *                 type: string
 *                 description: 현재 비밀번호
 *                 example: "currentPassword123!"
 *     responses:
 *       '200':
 *         description: 비밀번호 변경 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: object
 *                   properties:
 *                     success:
 *                       type: boolean
 *                       example: true
 *       '500':
 *         description: 서버 에러
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: object
 *                   properties:
 *                     success:
 *                       type: boolean
 *                       example: false
 *                     code:
 *                       type: integer
 *                       example: 500
 *                     message:
 *                       type: string
 *                       example: "현재 비밀번호가 일치하지 않습니다."
 */
router.patch(
  '/password-change',
  jwtToken.accessVerifyToken,
  userController.passwordChange
);

/**
 * @swagger
 * /api/v1/user/profile-image-delete:
 *   delete:
 *     tags:
 *       - User
 *     summary: 프로필 이미지 삭제
 *     description: 사용자의 프로필 이미지를 삭제합니다.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: 프로필 이미지 삭제 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: object
 *                   properties:
 *                     success:
 *                       type: boolean
 *                       example: true
 *       '500':
 *         description: 서버 에러
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: object
 *                   properties:
 *                     success:
 *                       type: boolean
 *                       example: false
 *                     code:
 *                       type: integer
 *                       example: 500
 *                     message:
 *                       type: string
 *                       example: "프로필 이미지 삭제 중 오류가 발생했습니다."
 */
router.delete(
  '/profile-image-delete',
  jwtToken.accessVerifyToken,
  userController.profileImageDelete
);

export default router;
