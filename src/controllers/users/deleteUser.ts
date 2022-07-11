import { Request, Response, NextFunction } from 'express';

import { usersRepository } from '../../db/dataSource';

const deleteUser = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const userToRemove = request.user;
    await usersRepository.remove(userToRemove);
    response.status(200).json({ message: userToRemove });
  } catch (err) {
    next(err);
  }
};

export default deleteUser;
