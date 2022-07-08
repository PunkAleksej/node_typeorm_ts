import { Request, Response, NextFunction } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import createCustomError from '../../utils/createCustomError';
import passHasher from '../../utils/passHasher';
import jwtTools from '../../utils/jwtTools';
import { AppDataSource } from '../../db/dataSource';
import { User } from '../../db/User';

export type UserInfo = {
  password?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
}

const updateUser = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const token = request.headers.authorization;
    if (!token) {
      throw createCustomError(407, 'Proxy Authentication Required');
    }
    const tokenPayload = jwtTools.validateAccessToken(token) as JwtPayload;
    const id = tokenPayload.id;
    if (!id) {
      throw createCustomError(404, `There is no user with id ${id}`);
    }
    const usersRepository = AppDataSource.getRepository(User);
    const userToUpdate = await usersRepository.findOneBy({ id });
    const { firstName, lastName, email, password } = request.body;
    if (email) {
      userToUpdate.email = email;
    }
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
    response.status(200).json({ userToUpdate });
  } catch (err) {
    next(err);
  }
};
export default updateUser;
