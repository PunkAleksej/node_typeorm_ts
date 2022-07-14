import { RequestHandler } from 'express-serve-static-core';
import { StatusCodes } from 'http-status-codes';
import passHasher from '../../utils/passHasher';
import { usersRepository } from '../../db/index';

type RequestBody = {
  password: string;
}

type Response = {
  message: string;
}

type ControllerType = RequestHandler<
Record<string, never>, Response, RequestBody, Record<string, never>>

const changePass: ControllerType = async (request, response, next) => {
  try {
    const userPassword = request.user.password;
    const password = request.body.password;
    if (passHasher.validatePassword(password, userPassword)) {
      return response.status(StatusCodes.CONFLICT).json({ message: 'passwords match' });
    }
    const userToUpdate = request.user;
    userToUpdate.password = passHasher.passHasher(password);

    await usersRepository.save(userToUpdate);
    response.status(StatusCodes.ACCEPTED).json({ message: 'password change' });
  } catch (err) {
    next(err);
  }
};
export default changePass;
