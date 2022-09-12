import { RequestHandler } from 'express-serve-static-core';
import { StatusCodes } from 'http-status-codes';
import { genreRepository, booksRepository } from '../../db';
import { Book } from '../../db/entity/Book';
import { Genre } from '../../db/entity/Genre';

type Response = {
  genres: Genre[];
  books: Book[];
}

type ControllerType = RequestHandler<
Record<string, never>, Response, Record<string, never>>

const getGenreList: ControllerType = async (request, response, next) => {
  try {
    const genres = await genreRepository.find();
    // const books = await booksRepository.find();
    const books = await booksRepository.find({
      relations: {
        genres: true,
        rating: true,
      },
    });
    const byField = (field) => {
      return (a, b) => (a[field] < b[field] ? 1 : -1);
    };
    books.sort(byField('middleRating'));
    response.status(StatusCodes.ACCEPTED).json({ genres, books });
  } catch (err) {
    next(err);
  }
};

export default getGenreList;
