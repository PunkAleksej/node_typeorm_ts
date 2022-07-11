import jwt from 'jsonwebtoken';
import createCustomError from './createCustomError';
import config from '../config';

const generateAccessToken = (id: string) => {
  const payload = { id };
  return jwt.sign(payload, config.tokenSecretKey, { expiresIn: config.tokenExpiresTime });
};

const validateAccessToken = (token: string) => {
  try {
    return jwt.verify(token, config.tokenSecretKey);
  } catch (err) {
    if (err.message === 'jwt expired') {
      throw createCustomError(401, 'jwt expired');
    }
    if (err.message === 'invalid signature') {
      throw createCustomError(401, 'invalid token');
    }
  }
};

export default { validateAccessToken, generateAccessToken };
