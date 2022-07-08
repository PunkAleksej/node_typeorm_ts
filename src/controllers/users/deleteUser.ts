import { Request, Response, NextFunction } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import createCustomError from '../../utils/createCustomError';
import jwtTools from '../../utils/jwtTools';
import { AppDataSource } from '../../db/dataSource';
import { User } from '../../db/User';

const deleteUser = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const token = request.headers.authorization;
    const tokenPayload = jwtTools.validateAccessToken(token) as JwtPayload;
    const id = tokenPayload.id;
    if (!id) {
      throw createCustomError(400, 'Value param is broken');
    }
    const usersRepository = AppDataSource.getRepository(User);
    const userToRemove = await usersRepository.findOneBy({ id });
    if (!userToRemove) {
      throw createCustomError(404, `There is no user with id ${id}`);
    }
    await usersRepository.remove(userToRemove);
    response.status(200).json({ message: userToRemove });
  } catch (err) {
    next(err);
  }
};

export default deleteUser;
