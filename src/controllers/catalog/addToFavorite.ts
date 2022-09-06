import { RequestHandler } from 'express-serve-static-core';
import { StatusCodes } from 'http-status-codes';
import { booksRepository, favoriteRepository, usersRepository } from '../../db/index';
import { Favorite } from '../../db/entity/Favorite';
import { User } from '../../db/entity/User';

type RequestBody = {
  bookId: string;
  userId: string;
}

type Response = {
  user: User;
}

type ControllerType = RequestHandler<
Record<string, never>, Response, RequestBody, Record<string, never>>

const addToFavorite: ControllerType = async (request, response, next) => {
  try {
    const bookId = +request.body.bookId;
    const userId = +request.user.id;
    const favoriteOverwriting = await favoriteRepository.findOne({
      relations: {
        Book: true,
        User: true,
      },
      where: {
        Book: {
          id: bookId,
        },
        User: {
          id: userId,
        },
      },
    });
    const newFavorite = new Favorite();
    const favoriteToUpdate = favoriteOverwriting || newFavorite;
    favoriteToUpdate.Book = await booksRepository.findOneBy({ id: bookId });
    favoriteToUpdate.User = await usersRepository.findOneBy({ id: userId });
    favoriteRepository.create(favoriteToUpdate);
    await favoriteRepository.save(favoriteToUpdate);
    const updatedUser = await usersRepository.findOneBy({ id: userId });
    return response
      .status(StatusCodes.CREATED)
      .json({ user: updatedUser });
  } catch (err) {
    next(err);
  }
};

export default addToFavorite;
