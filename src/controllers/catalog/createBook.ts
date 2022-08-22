import { RequestHandler } from 'express-serve-static-core';
import { StatusCodes } from 'http-status-codes';
import { Book } from '../../db/entity/Book';
import { booksRepository } from '../../db/index';
import { appDataSource } from '../../db/dataSource';

type RequestBody = {
  name: string;
  description: string;
  price: number;
}

type Response = {
  book: Book | null;
}

type ControllerType = RequestHandler<
Record<string, never>, Response, RequestBody, Record<string, never>>

const createBook: ControllerType = async (request, response, next) => {
  try {
    const { name, description, price } = request.body;

    const newBook = new Book();
    newBook.name = name;
    newBook.description = description;
    newBook.price = price;
    await appDataSource.manager.save(newBook);
    const createdBook = await booksRepository.findOneBy({ name });
    return response
      .status(StatusCodes.CREATED)
      .json({ book: createdBook });
  } catch (err) {
    next(err);
  }
};

export default createBook;
