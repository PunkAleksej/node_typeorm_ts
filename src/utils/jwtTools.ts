import jwt from 'jsonwebtoken';

import config from '../config';

const generateAccessToken = (id: string) => {
  const payload = { id };
  return jwt.sign(payload, config.tokenSecretKey, { expiresIn: config.tokenExpiresTime });
};

const validateAccessToken = (token: string) => {
  return jwt.verify(token, config.tokenSecretKey);
};

export default { validateAccessToken, generateAccessToken };
