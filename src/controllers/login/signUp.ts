import { Request, Response, NextFunction } from 'express';
import { User } from '../../db/User';
import { usersRepository, AppDataSource } from '../../db/dataSource';
import passHasher from '../../utils/passHasher';
import createCustomError from '../../utils/createCustomError';

const signUp = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const { firstName, lastName, email, password } = request.body;
    const emailCheck = await usersRepository.findOneBy({ email });
    if (emailCheck) {
      throw createCustomError(400, 'The user already exists');
    }
    const user = new User();
    user.firstName = firstName;
    user.lastName = lastName;
    user.password = passHasher.passHasher(password);
    user.email = email;
    await AppDataSource.manager.save(user);
    return response.status(201).json({ message: 'registration complete' });
  } catch (err) {
    next(err);
  }
};

export default signUp;
