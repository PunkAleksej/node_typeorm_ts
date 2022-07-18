import { Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { usersRepository } from '../../db/index';
import { User } from '../../db/entity/User';

type deleteRequest = {
  user?: User;
}

const deleteUser = async (request: deleteRequest, response: Response, next: NextFunction) => {
  try {
    const userToRemove = request.user;
    await usersRepository.remove(userToRemove);
    response.status(StatusCodes.ACCEPTED).json({ user: userToRemove });
  } catch (err) {
    next(err);
  }
};

export default deleteUser;
