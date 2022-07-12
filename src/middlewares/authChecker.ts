import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import createCustomError from '../utils/createCustomError';
import jwtTools, { Payload } from '../utils/jwtTools';
import { usersRepository } from '../db/dataSource';

const jwtCheker = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const token = request.headers.authorization;
    if (!token) {
      throw createCustomError(StatusCodes.BAD_REQUEST, 'Token is missing');
    }

    const tokenPayload = jwtTools.validateAccessToken(token) as Payload;

    const id = +tokenPayload.id;
    const user = await usersRepository.findOneBy({ id });
    if (!user) {
      throw createCustomError(StatusCodes.NOT_FOUND, `There is no user with id ${id}`);
    }
    request.user = user;
    next();
  } catch (err) {
    next(err);
  }
};

export default jwtCheker;
