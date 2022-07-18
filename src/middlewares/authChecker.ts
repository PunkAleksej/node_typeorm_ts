import { Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import createCustomError from '../utils/createCustomError';
import jwtTools, { Payload } from '../utils/authTools';
import { usersRepository } from '../db/index';
import { User } from '../db/entity/User';

type tokenRequest = {
  user?: User;
  headers: {
    authorization?: string;
  }
}

const jwtCheker = async (request: tokenRequest, response: Response, next: NextFunction) => {
  try {
    const token = request.headers.authorization;
    if (!token) {
      throw createCustomError(StatusCodes.UNAUTHORIZED, 'Token is missing');
    }

    const tokenPayload = jwtTools.validateAccessToken(token) as Payload;

    const id = tokenPayload.id;
    const user = await usersRepository.findOneBy({ id });
    if (!user) {
      throw createCustomError(StatusCodes.FORBIDDEN, `There is no user with id ${id}`);
    }
    request.user = user;
    next();
  } catch (err) {
    next(err);
  }
};

export default jwtCheker;
