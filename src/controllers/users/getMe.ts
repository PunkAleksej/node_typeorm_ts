import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { usersRepository } from '../../db/dataSource';

const getUser = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const userId = +request.query.id;
    const user = await usersRepository.findOneBy({ id: userId });
    response.status(StatusCodes.ACCEPTED).json({ user });
  } catch (err) {
    next(err);
  }
};

export default getUser;
