import { RequestHandler } from 'express-serve-static-core';
import { StatusCodes } from 'http-status-codes';
import { booksRepository } from '../../db';
import { Book } from '../../db/entity/Book';

type RequestUser = {
  bookId: string;
}

type ControllerType = RequestHandler<
Record<string, never>, Book[], RequestUser, Record<string, never>>
const getBooksById: ControllerType = async (request, response, next) => {
  try {
    const bookId = request.body.bookId;
    const targetBooks = bookId.split(',').map((id) => ({ id: +id }));
    const book = await booksRepository.find({
      relations: {
        genres: true,
        author: true,
        rating: true,
        cart: true,
      },
      where: targetBooks,
    });
    response.status(StatusCodes.ACCEPTED).json(book);
  } catch (err) {
    next(err);
  }
};

export default getBooksById;
