import { NextFunction, Request, Response } from 'express';
import createCustomError from '../../utils/createCustomError';
import jwtTools from '../../utils/jwtTools';

const testToken = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const token = request.headers.authorization;
    if (!token) {
      throw createCustomError(407, 'Proxy Authentication Required');
    }
    if (!jwtTools.validateAccessToken(token)) {
      throw createCustomError(400, 'Value token param is broken');
    }
    const validateTokenAnswer = jwtTools.validateAccessToken(token);

    response.status(200).json({
      message: validateTokenAnswer,
    });
  } catch (err) {
    next(err);
  }
};
export default testToken;
