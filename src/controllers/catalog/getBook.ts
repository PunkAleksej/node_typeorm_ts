import { RequestHandler } from 'express-serve-static-core';
import { StatusCodes } from 'http-status-codes';
import { booksRepository } from '../../db';
import { Book } from '../../db/entity/Book';

type RequestUser = {
  bookId: string;
}

type Response = {
  book: Book;
}

type ControllerType = RequestHandler<
Record<string, never>, Response, RequestUser, Record<string, never>>

const getBook: ControllerType = async (request, response, next) => {
  try {
    const bookId = +request.body.bookId;
    const book = await booksRepository.findOne({
      relations: {
        genres: true,
        author: true,
        rating: true,
      },
      where: {
        id: bookId,
      },
    });
    // let ratingSum = 0;
    // const RatingList = [];
    // book.rating.forEach((elem) => {
    //   RatingList.push(elem.bookRating);
    //   ratingSum += elem.bookRating;
    // });
    // const middleRating = ratingSum / RatingList.length;
    // book.middleRating = middleRating;

    response.status(StatusCodes.ACCEPTED).json({ book });
  } catch (err) {
    next(err);
  }
};

export default getBook;
