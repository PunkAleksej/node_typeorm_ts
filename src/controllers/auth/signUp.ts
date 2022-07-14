import { RequestHandler } from 'express-serve-static-core';
import { StatusCodes } from 'http-status-codes';
import { User } from '../../db/entity/User';
import { usersRepository } from '../../db/index';
import { appDataSource } from '../../db/dataSource';
import passHasher from '../../utils/passHasher';
import createCustomError from '../../utils/createCustomError';
import jwtTools from '../../utils/jwtTools';

type RequestBody = {
  firstName: string;
  lastName:string;
  email: string;
  password: string;
  DoB: string,
}

type Response = {
  message: string;
  token: string;
}

type ControllerType = RequestHandler<
Record<string, never>, Response, RequestBody, Record<string, never>>

const signUp: ControllerType = async (request, response, next) => {
  try {
    const { firstName, lastName, email, password, DoB } = request.body;
    const emailCheck = await usersRepository.findOneBy({ email });
    if (emailCheck) {
      throw createCustomError(StatusCodes.BAD_REQUEST, 'The user already exists');
    }
    const newUser = new User();
    newUser.firstName = firstName;
    newUser.lastName = lastName;
    newUser.password = passHasher.passHasher(password);
    newUser.email = email;
    newUser.DoB = new Date(DoB);
    await appDataSource.manager.save(newUser);
    const newUserId = +(await usersRepository.findOneBy({ email })).id;
    const newToken = jwtTools.generateAccessToken(newUserId);
    return response
      .status(StatusCodes.ACCEPTED)
      .json({ message: 'registration complete', token: newToken });
  } catch (err) {
    next(err);
  }
};

export default signUp;
