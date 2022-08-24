import { StatusCodes } from 'http-status-codes';
import { RequestHandler } from 'express-serve-static-core';
import { Between, FindManyOptions, ILike } from 'typeorm';
import { Book } from '../../db/entity/Book';
import createCustomError from '../../utils/createCustomError';
import { booksRepository } from '../../db';
import { Author } from '../../db/entity/Author';

// type ReqParams = {
//   id: string;
// }

// type ReqQuery = {
//   column?: string;
//   order?: 'ASC' | 'DESC';
//   perPage: number;
//   page: number;
//   minPrice?: number;
//   maxPrice?: number;
//   search?: string;
//   genres?: string;
// }

type ResBody = Book[];

// type ControllerType = RequestHandler<
// ReqParams, ResBody, object, ReqQuery>

const booksFilter = async (req, res, next) => {
  try {
    const order = {
      [req.query.column]: req.query.order,
    };
    const { search, perPage, priceFrom, priceTo, sortBy, genres } = req.query;
    // const take = req.query.perPage;
    // const page = +req.query.page;
    // const skip = take ? (page - 1) * take : null;
    const price = Between(priceFrom || 0, priceTo || 10000);
    let where: FindManyOptions<Book>['where'];

    if (search) {
      const searchQuery = ILike(`%${search}%`);
      where = [
        { name: searchQuery, price },
        { author: searchQuery, price },
        // { desription: searchQuery, price },
      ];
    } else if (genres) {
      const genresArr = genres.split(',');
      const arr = genresArr.map((genre) => {
        return { id: Number(genre) };
      });
      where = {
        genres: arr,
        price,
      };
    } else {
      where = { price };
    }

    const [books, totalCount] = await booksRepository.findAndCount({
      relations: {
        genres: true,
        rating: true,
        author: true,
      },
      where,
      order,
      // skip,
      // take,
    });

    const byField = (field, reverse) => {
      return reverse
        ? (a, b) => (a[field] < b[field] ? 1 : -1)
        : (a, b) => (a[field] > b[field] ? 1 : -1);
    };
    const test = false;
    switch (sortBy) {
    case 'Price':
      books.sort(byField('price', test));
      break;
    case 'Author':
      books.sort(byField((author) => (author.name), test));
      break;
    case 'Rating':
      books.sort(byField('middleRating', false));
      break;
    case 'Date of issue':
      books.sort(byField('releasedAt', false));
      break;
    case 'Name':
      books.sort(byField('name', false));
      break;
    default:
      break;
    }

    if (!books) {
      throw createCustomError(StatusCodes.NOT_FOUND, 'books not found');
    }

    return res.status(StatusCodes.OK).json(books);
  } catch (err) {
    next(err);
  }
};

export default booksFilter;
