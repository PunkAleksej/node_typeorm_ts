import { RequestHandler } from 'express-serve-static-core';
import { StatusCodes } from 'http-status-codes';
import { genreRepository, booksRepository, usersRepository } from '../../db';
import { Book } from '../../db/entity/Book';
import { Genre } from '../../db/entity/Genre';
import { User } from '../../db/entity/User';
import jwtTools, { Payload } from '../../utils/authTools';

type Response = {
  genres: Genre[];
  books: Book[];
  user: User;
}

type ControllerType = RequestHandler<
Record<string, never>, Response, Record<string, never>>

const getGenreList: ControllerType = async (request, response, next) => {
  try {
    let user = null;
    if (request.headers.authorization) {
      const token = request.headers.authorization.split(' ')[1];
      const tokenPayload = jwtTools.validateAccessToken(token) as Payload;
      const id = tokenPayload.id;
      user = await usersRepository.findOneBy({ id });
    }
    const genres = await genreRepository.find();
    // const books = await booksRepository.find();
    const books = await booksRepository.find({
      relations: {
        genres: true,
        author: true,
        rating: true,
      },
    });
    const byField = (field) => {
      return (a, b) => (a[field] < b[field] ? 1 : -1);
    };
    books.sort(byField('middleRating'));
    response.status(StatusCodes.ACCEPTED).json({ genres, books, user });
  } catch (err) {
    next(err);
  }
};

export default getGenreList;
