import { Request, Response, NextFunction } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import createCustomError from '../utils/createCustomError';
import jwtTools from '../utils/jwtTools';
import { usersRepository } from '../db/dataSource';

const jwtCheker = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const token = request.headers.authorization;
    if (!token) {
      throw createCustomError(401, 'Token is missing');
    }

    const tokenPayload = jwtTools.validateAccessToken(token) as JwtPayload;

    const id = tokenPayload.id;
    const user = await usersRepository.findOneBy({ id });
    if (!user) {
      throw createCustomError(404, `There is no user with id ${id}`);
    }
    request.user = user;
    next();
  } catch (err) {
    next(err);
  }
};

export default jwtCheker;
