import { RequestHandler } from 'express-serve-static-core';
import { StatusCodes } from 'http-status-codes';
import { cartRepository, usersRepository } from '../../db/index';
import { User } from '../../db/entity/User';

type RequestBody = {
  id: string;
}

type Response = {
  user: User;
}

type ControllerType = RequestHandler<
Record<string, never>, Response, RequestBody, Record<string, never>>

const deleteFromCart: ControllerType = async (request, response, next) => {
  try {
    const userId = +request.user.id;
    const cartId = +request.body.id;
    await cartRepository.delete(cartId);
    const updatedUser = await usersRepository.findOneBy({ id: userId });
    return response
      .status(StatusCodes.CREATED)
      .json({ user: updatedUser });
  } catch (err) {
    next(err);
  }
};

export default deleteFromCart;
