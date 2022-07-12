import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import createCustomError from '../../utils/createCustomError';
import jwtTools from '../../utils/jwtTools';

const testToken = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const token = request.headers.authorization;
    if (!token) {
      throw createCustomError(StatusCodes.BAD_REQUEST, 'Proxy Authentication Required');
    }
    if (!jwtTools.validateAccessToken(token)) {
      throw createCustomError(StatusCodes.UNAUTHORIZED, 'Value token param is broken');
    }
    const validateTokenAnswer = jwtTools.validateAccessToken(token);

    response.status(StatusCodes.ACCEPTED).json({
      message: validateTokenAnswer,
    });
  } catch (err) {
    next(err);
  }
};
export default testToken;
