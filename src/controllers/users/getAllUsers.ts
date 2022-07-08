import { Request, Response, NextFunction } from 'express';
import { AppDataSource } from '../../db/dataSource';
import { User } from '../../db/User';

const getAllUsers = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const users = await AppDataSource.manager.find(User);
    response.status(200).json({ users });
  } catch (err) {
    next(err);
  }
};

export default getAllUsers;
