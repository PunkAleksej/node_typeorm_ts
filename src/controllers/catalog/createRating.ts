import { RequestHandler } from 'express-serve-static-core';
import { StatusCodes } from 'http-status-codes';
import { booksRepository, ratingRepository, usersRepository } from '../../db/index';
import { Rating } from '../../db/entity/Rating';

type RequestBody = {
  bookId: string;
  userId: string;
  bookRating: string;
}

type Response = {
  rating: Rating;
}

type ControllerType = RequestHandler<
Record<string, never>, Response, RequestBody, Record<string, never>>

const createRating: ControllerType = async (request, response, next) => {
  try {
    const bookId = +request.body.bookId;
    const userId = +request.user.id;
    const bookRating = +request.body.bookRating;
    const ratingOverwriting = await ratingRepository.findOne({
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
    const newRating = new Rating();
    const ratingToUpdate = ratingOverwriting || newRating;
    ratingToUpdate.Book = await booksRepository.findOneBy({ id: bookId });
    ratingToUpdate.User = await usersRepository.findOneBy({ id: userId });
    ratingToUpdate.bookRating = bookRating;
    ratingRepository.create(ratingToUpdate);
    await ratingRepository.save(ratingToUpdate);
    return response
      .status(StatusCodes.CREATED)
      .json({ rating: ratingToUpdate });
  } catch (err) {
    next(err);
  }
};

export default createRating;
