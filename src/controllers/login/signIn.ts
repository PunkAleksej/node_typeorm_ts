import { NextFunction, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { usersRepository } from '../../db/dataSource';
import jwtTools from '../../utils/jwtTools';
import passHasher from '../../utils/passHasher';
import createCustomError from '../../utils/createCustomError';

type signInRequest = {
  body: {
    email: string;
    password: string;
  }
}

const loginUser = async (request: signInRequest, response: Response, next: NextFunction) => {
  try {
    const { email, password } = request.body;
    const user = await usersRepository.findOneBy({ email });
    if (!user) {
      throw createCustomError(StatusCodes.NOT_FOUND, 'User not found');
    }
    const id = user.id;
    const userPassword = user.password;
    if (passHasher.validatePassword(password, userPassword)) {
      const token = jwtTools.generateAccessToken(id);
      return response.status(StatusCodes.OK).json({ token });
    }
    throw createCustomError(StatusCodes.BAD_REQUEST, 'Wrong password');
  } catch (err) {
    next(err);
  }
};

export default loginUser;
