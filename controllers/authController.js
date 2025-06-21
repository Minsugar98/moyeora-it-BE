import { client } from "../config/redis.js";
import authService from "../services/authService.js";

/**
{
  "userId": 5,
  "email": "user@example.com",
  "token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjUsImVtYWlsIjoidXNlckBleGFtcGxlLmNvbSIsImlhdCI6MTc0ODE5MzkxMCwiZXhwIjoxNzQ4MjA0NzEwfQ.rKS1buJaMN8HLJlUCs1SyQnKCoqyNPsnhE2EEpLPjY"
}
 */
const handleSpringAuth = async (req, res) => {
  try {
    const { userId, email, token } = req.body;

    const result = await authService.handleSpringAuth(userId, email, token);

    await client.set(String(userId), JSON.stringify(result));

    // 쿠키에 토큰 저장
    res.cookie("accessToken", result.accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    });

    res.cookie("refreshToken", result.refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    });

    return res.status(200).json({ status: { success: true } });
  } catch (error) {
    return res.status(500).json({
      status: { success: false, code: 500, message: error.message },
    });
  }
};
export default {
  handleSpringAuth,
};
