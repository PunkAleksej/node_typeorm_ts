import { RequestHandler } from 'express-serve-static-core';
import { StatusCodes } from 'http-status-codes';
import { usersRepository } from '../../db/index';
import jwtTools from '../../utils/authTools';
import passHasher from '../../utils/passHasher';
import createCustomError from '../../utils/createCustomError';
import { User } from '../../db/entity/User';

type RequestBody = {
  email: string;
  password: string;
}

type ControllerType = RequestHandler<
Record<string, never>, { token: string, user: User }, RequestBody, Record<string, never>>

const authUser: ControllerType = async (request, response, next) => {
  try {
    const { email, password } = request.body;
    const user = await usersRepository
      .createQueryBuilder('user')
      .where('user.email=:email', { email })
      .addSelect('user.password')
      .getOne();
    if (!user) {
      throw createCustomError(StatusCodes.NOT_FOUND, 'User not found');
    }
    const userPassword = user.password;
    if (!passHasher.validatePassword(password, userPassword)) {
      throw createCustomError(StatusCodes.BAD_REQUEST, 'Wrong password');
    }
    const id = user.id;
    const token = jwtTools.generateAccessToken(id);
    const responseUser = await usersRepository.findOneBy({ email });
    return response.status(StatusCodes.OK).json({ token, user: responseUser });
  } catch (err) {
    next(err);
  }
};

export default authUser;
