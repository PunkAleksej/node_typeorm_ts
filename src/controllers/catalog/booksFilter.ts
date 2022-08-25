import { StatusCodes } from 'http-status-codes';
import { RequestHandler } from 'express-serve-static-core';
import { Between, FindManyOptions, ILike } from 'typeorm';
import { Book } from '../../db/entity/Book';
import createCustomError from '../../utils/createCustomError';
import { booksRepository } from '../../db';

type ReqParams = {
  id: string;
}

type ReqQuery = {
  column?: string;
  order?: 'ASC' | 'DESC';
  perPage: number;
  page: number;
  priceFrom?: number;
  priceTo?: number;
  name?: string;
  genres?: string;
  author?: string;
}

type ResBody = Book[];

type ControllerType = RequestHandler<
ReqParams, ResBody, object, ReqQuery>

const booksFilter: ControllerType = async (req, res, next) => {
  try {
    const order = {
      [req.query.column]: req.query.order,
    };
    const { name, priceFrom, priceTo, author, genres } = req.query;
    // const take = req.query.perPage;
    // const page = +req.query.page;
    // const skip = take ? (page - 1) * take : null;
    const price = Between(priceFrom || 0, priceTo || 10000);
    let where: FindManyOptions<Book>['where'];

    if (name) {
      const searchQuery = ILike(`%${name}%`);
      where = [
        { name: searchQuery, price },
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
    } else if (author) {
      const authorsArr = author.split(',');
      const arr = authorsArr.map((author) => {
        return { name: String(author) };
      });
      where = {
        author: arr,
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
    const sortPriority = req.query.order === 'ASC';
    if (req.query.column === 'middleRating') {
      books.sort(byField('middleRating', sortPriority));
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
