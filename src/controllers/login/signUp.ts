import { Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { User } from '../../db/User';
import { usersRepository, AppDataSource } from '../../db/dataSource';
import passHasher from '../../utils/passHasher';
import createCustomError from '../../utils/createCustomError';

type signUpRequest = {
  body: {
    firstName: string;
    lastName:string;
    email: string;
    password: string;
  }
}

const signUp = async (request: signUpRequest, response: Response, next: NextFunction) => {
  try {
    const { firstName, lastName, email, password } = request.body;
    const emailCheck = await usersRepository.findOneBy({ email });
    if (emailCheck) {
      throw createCustomError(StatusCodes.BAD_REQUEST, 'The user already exists');
    }
    const user = new User();
    user.firstName = firstName;
    user.lastName = lastName;
    user.password = passHasher.passHasher(password);
    user.email = email;
    await AppDataSource.manager.save(user);
    return response.status(StatusCodes.ACCEPTED).json({ message: 'registration complete' });
  } catch (err) {
    next(err);
  }
};

export default signUp;
