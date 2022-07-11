import { Request, Response, NextFunction } from 'express';
import { usersRepository } from '../../db/dataSource';

const getUser = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const { id } = request.query;
    const userId = +id;
    const user = await usersRepository.findOneBy({ id: userId });
    response.status(200).json({ user });
  } catch (err) {
    next(err);
  }
};

export default getUser;
