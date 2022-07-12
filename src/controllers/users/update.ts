import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import passHasher from '../../utils/passHasher';
import { usersRepository } from '../../db/dataSource';

export type UserInfo = {
  password?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
}

const updateUser = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const userToUpdate = request.user;
    const { firstName, lastName, password } = request.body;
    if (password) {
      userToUpdate.password = passHasher.passHasher(password);
    }
    if (firstName) {
      userToUpdate.firstName = firstName;
    }

    if (lastName) {
      userToUpdate.lastName = lastName;
    }
    await usersRepository.save(userToUpdate);
    response.status(StatusCodes.ACCEPTED).json({ userToUpdate });
  } catch (err) {
    next(err);
  }
};
export default updateUser;
