import { RequestHandler } from 'express-serve-static-core';
import { StatusCodes } from 'http-status-codes';
import passHasher from '../../utils/passHasher';
import { usersRepository } from '../../db/index';
import createCustomError from '../../utils/createCustomError';

type RequestBody = {
  oldPassword: string;
  newPassword: string;
}

type Response = {
  message: string;
}

type ControllerType = RequestHandler<
Record<string, never>, Response, RequestBody, Record<string, never>>

const changePass: ControllerType = async (request, response, next) => {
  try {
    const user = await usersRepository
      .createQueryBuilder('user')
      .addSelect('user.password')
      .where('user.id = :id', { id: request.user.id })
      .getOne();
    // const user = await usersRepository
    //   .createQueryBuilder()
    //   .select('User.email', `${email}`)
    //   .addSelect('User.password')
    //   .getOne();
    const userPassword = user.password;
    const newPassword = request.body.newPassword;
    const oldPassword = request.body.oldPassword;
    if (!passHasher.validatePassword(oldPassword, userPassword)) {
      throw createCustomError(StatusCodes.BAD_REQUEST, 'Wrong password');
    }
    const userToUpdate = request.user;
    userToUpdate.password = passHasher.passHasher(newPassword);

    await usersRepository.save(userToUpdate);
    response.status(StatusCodes.OK).json({ message: 'password changed' });
  } catch (err) {
    next(err);
  }
};
export default changePass;
