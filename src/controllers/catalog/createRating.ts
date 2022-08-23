import { RequestHandler } from 'express-serve-static-core';
import { StatusCodes } from 'http-status-codes';
import { booksRepository, ratingRepository, usersRepository } from '../../db/index';
import { Rating } from '../../db/entity/Rating';

type RequestBody = {
  bookId: number;
  userId: number;
  bookRating: number;
}

type Response = {
  rating: Rating;
}

type ControllerType = RequestHandler<
Record<string, never>, Response, RequestBody, Record<string, never>>

const createRating: ControllerType = async (request, response, next) => {
  try {
    const { bookId, userId, bookRating } = request.body;
    const newRating = new Rating();
    newRating.Book = await booksRepository.findOneBy({ id: bookId });
    newRating.User = await usersRepository.findOneBy({ id: userId });
    newRating.bookRating = bookRating;
    await ratingRepository.create(newRating);
    await ratingRepository.save(newRating);
    return response
      .status(StatusCodes.CREATED)
      .json({ rating: newRating });
  } catch (err) {
    next(err);
  }
};

export default createRating;
