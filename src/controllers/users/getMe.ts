import { Request, Response, NextFunction } from 'express';
import { AppDataSource } from '../../db/dataSource';
import { User } from '../../db/User';

const getUser = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const { id } = request.query;
    const userId = +id;
    const usersRepository = AppDataSource.getRepository(User);
    const user = await usersRepository.findOneBy({ id: userId });
    response.status(200).json({ user });
  } catch (err) {
    next(err);
  }
};

export default getUser;
