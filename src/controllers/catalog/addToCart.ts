import { RequestHandler } from 'express-serve-static-core';
import { StatusCodes } from 'http-status-codes';
import { booksRepository, cartRepository, usersRepository } from '../../db/index';
import { Cart } from '../../db/entity/Cart';
import { User } from '../../db/entity/User';

type RequestBody = {
  bookId: string;
  userId: string;
  booksQuantity: string;
}

type Response = {
  user: User;
}

type ControllerType = RequestHandler<
Record<string, never>, Response, RequestBody, Record<string, never>>

const addToCart: ControllerType = async (request, response, next) => {
  try {
    const bookId = +request.body.bookId;
    const userId = +request.user.id;
    const booksQuantity = +request.body.booksQuantity;
    const cartsOverwriting = await cartRepository.findOne({
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
    const newCart = new Cart();
    const cartToUpdate = cartsOverwriting || newCart;
    cartToUpdate.Book = await booksRepository.findOneBy({ id: bookId });
    cartToUpdate.User = await usersRepository.findOneBy({ id: userId });
    cartToUpdate.booksQuantity = booksQuantity;
    cartRepository.create(cartToUpdate);
    await cartRepository.save(cartToUpdate);
    const updatedUser = await usersRepository.findOneBy({ id: userId });
    return response
      .status(StatusCodes.CREATED)
      .json({ user: updatedUser });
  } catch (err) {
    next(err);
  }
};

export default addToCart;
