import { NextFunction, Request, Response } from 'express';

import jwtTools from '../../utils/jwtTools';

const testToken = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const token = request.headers.authorization;

    const validateTokenAnswer = jwtTools.validateAccessToken(token);

    response.status(200).json({
      message: validateTokenAnswer,
    });
  } catch (err) {
    next(err);
  }
};
export default testToken;
