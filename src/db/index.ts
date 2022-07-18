import { appDataSource } from './dataSource';
import { User } from './entity/User';

export const usersRepository = appDataSource.getRepository(User);
