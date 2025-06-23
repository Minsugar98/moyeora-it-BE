import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

export const smtpTransport = nodemailer.createTransport({
  pool: true,
  maxConnections: 1,
  service: 'naver',
  host: 'smtp.naver.com',
  port: 587,
  secure: false,
  requireTLS: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

export const sendEmailAuth = async (email, newPassword) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: '임시 비밀번호 입니다.',
    html: `<h1>임시 비밀번호 입니다. \n\n\n\n\n\n</h1> ${newPassword}
    <a href="https://my.sjcpop.com/login" style="background-color: #007bff; color: white; padding: 10px 20px; border-radius: 5px; text-decoration: none;">로그인</a>`,
  };

  return new Promise((resolve, reject) => {
    smtpTransport.sendMail(mailOptions, (err, response) => {
      smtpTransport.close();
      if (err) {
        reject({
          ok: false,
          msg: '메일 전송에 실패하였습니다.',
          error: err.message,
        });
      } else {
        resolve({
          ok: true,
          msg: '메일 전송에 성공하였습니다.',
          authNum: newPassword,
        });
      }
    });
  });
};
