import { RequestHandler } from 'express-serve-static-core';
import { StatusCodes } from 'http-status-codes';
import { booksRepository } from '../../db';
import { Book } from '../../db/entity/Book';

type RequestUser = {
  bookId: string;
}

type ControllerType = RequestHandler<
Record<string, never>, Book, RequestUser, Record<string, never>>

const getBook: ControllerType = async (request, response, next) => {
  try {
    const bookId = +request.query.id;
    const book = await booksRepository.findOne({
      relations: {
        genres: true,
        rating: true,
      },
      where: {
        id: bookId,
      },
    });
    response.status(StatusCodes.ACCEPTED).json(book);
  } catch (err) {
    next(err);
  }
};

export default getBook;
