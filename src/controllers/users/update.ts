import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import passHasher from '../../utils/passHasher';
import { usersRepository } from '../../db/index';
import createCustomError from '../../utils/createCustomError';
import jwtTools from '../../utils/authTools';

export type UserInfo = {
  password?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
}

const updateUser = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const userToUpdate = request.user;
    const { firstName, lastName, password, email } = request.body;
    if (email) {
      const existUser = await usersRepository.findOneBy({ email });
      if (existUser && userToUpdate.id !== existUser.id) {
        throw createCustomError(StatusCodes.BAD_REQUEST, 'The email already exists');
      }
    }
    userToUpdate.email = email;
    if (password) {
      userToUpdate.password = passHasher.passHasher(password);
    }
    if (firstName) {
      userToUpdate.firstName = firstName;
    }

    if (lastName) {
      userToUpdate.lastName = lastName;
    }
    const token = jwtTools.generateAccessToken(request.user.id);
    await usersRepository.save(userToUpdate);
    response.status(StatusCodes.ACCEPTED).json({ token, user: userToUpdate });
  } catch (err) {
    next(err);
  }
};
export default updateUser;
