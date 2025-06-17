const accessTokenOption = {
  httpOnly: true,
  secure: true,
  sameSite: 'None',
  maxAge: 1000 * 60 * 60 * 3,
  path: '/',
  domain: '.sjcpop.com',
};

const refreshTokenOption = {
  httpOnly: true,
  secure: true,
  sameSite: 'None',
  maxAge: 1000 * 60 * 60 * 24 * 7,
  path: '/',
  domain: '.sjcpop.com',
};

const clearAccessTokenOption = {
  httpOnly: true,
  secure: true,
  sameSite: 'None',
  maxAge: 0,
  path: '/',
  domain: '.sjcpop.com',
};

const clearRefreshTokenOption = {
  httpOnly: true,
  secure: true,
  sameSite: 'None',
  maxAge: 0,
  path: '/',
  domain: '.sjcpop.com',
};

export {
  accessTokenOption,
  refreshTokenOption,
  clearAccessTokenOption,
  clearRefreshTokenOption,
};
