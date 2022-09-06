import { RequestHandler } from 'express-serve-static-core';
import { StatusCodes } from 'http-status-codes';
import { favoriteRepository, usersRepository } from '../../db/index';
import { User } from '../../db/entity/User';

type RequestBody = {
  id: string;
}

type Response = {
  user: User;
}

type ControllerType = RequestHandler<
Record<string, never>, Response, RequestBody, Record<string, never>>

const deleteFromFavorite: ControllerType = async (request, response, next) => {
  try {
    const userId = +request.user.id;
    const favoriteId = +request.body.id;
    await favoriteRepository.delete(favoriteId);
    const updatedUser = await usersRepository.findOneBy({ id: userId });
    return response
      .status(StatusCodes.CREATED)
      .json({ user: updatedUser });
  } catch (err) {
    next(err);
  }
};

export default deleteFromFavorite;
