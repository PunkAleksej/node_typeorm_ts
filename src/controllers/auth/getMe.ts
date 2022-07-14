import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

const getMe = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const user = request.user;
    response.status(StatusCodes.ACCEPTED).json({ user });
  } catch (err) {
    next(err);
  }
};

export default getMe;
