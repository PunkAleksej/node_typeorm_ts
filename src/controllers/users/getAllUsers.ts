import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { AppDataSource } from '../../db/dataSource';
import { User } from '../../db/User';

const getAllUsers = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const users = await AppDataSource.manager.find(User);
    response.status(StatusCodes.ACCEPTED).json({ users });
  } catch (err) {
    next(err);
  }
};

export default getAllUsers;
