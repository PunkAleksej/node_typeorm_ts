import { NextFunction, Request, Response } from 'express';
import { AppDataSource } from '../../db/dataSource';
import { User } from '../../db/User';
import jwtTools from '../../utils/jwtTools';
import passHasher from '../../utils/passHasher';
import createCustomError from '../../utils/createCustomError';

const loginUser = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const { email, password } = request.body;
    const usersRepository = AppDataSource.getRepository(User);
    const user = await usersRepository.findOneBy({ email });
    if (!user) {
      throw createCustomError(404, 'User not found');
    }
    const id = user.id;
    const userPassword = user.password;
    if (passHasher.validatePassword(password, userPassword)) {
      const token = jwtTools.generateAccessToken(`${id}`);
      return response.status(200).json({ token });
    }
    throw createCustomError(400, 'Wrong password');
  } catch (err) {
    next(err);
  }
};

export default loginUser;
