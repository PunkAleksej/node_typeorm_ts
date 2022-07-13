import jwt from 'jsonwebtoken';
import { StatusCodes } from 'http-status-codes';
import createCustomError from './createCustomError';
import config from '../config';

export interface Payload {
  id: number;
}

const generateAccessToken = (id: number) => {
  const payload = { id };
  return jwt.sign(payload, config.tokenSecretKey, { expiresIn: config.tokenExpiresTime });
};

const validateAccessToken = (token: string) => {
  try {
    return (jwt.verify(token, config.tokenSecretKey)) as Payload;
  } catch (err) {
    if (err.message === 'jwt expired') {
      throw createCustomError(StatusCodes.UNAUTHORIZED, 'jwt expired');
    }
    if (err.message === 'invalid signature') {
      throw createCustomError(StatusCodes.UNAUTHORIZED, 'invalid token');
    }
    throw err;
  }
};

export default { validateAccessToken, generateAccessToken };
