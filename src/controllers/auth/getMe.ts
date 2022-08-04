import { RequestHandler } from 'express-serve-static-core';
import { StatusCodes } from 'http-status-codes';
import { User } from '../../db/entity/User';

type RequestUser = {
  firstName: string;
  lastName:string;
  email: string;
  password: string;
  DoB: string,
}

type Response = {
  user: User;
}

type ControllerType = RequestHandler<
Record<string, never>, Response, RequestUser, Record<string, never>>

const getMe: ControllerType = async (request, response, next) => {
  try {
    const user = request.user;
    response.status(StatusCodes.ACCEPTED).json({ user });
  } catch (err) {
    next(err);
  }
};

export default getMe;
