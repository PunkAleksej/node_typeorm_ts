import { appDataSource } from './dataSource';
import { User } from './entity/User';

const connection = appDataSource.initialize().then(async () => {
  const user = new User();
  user.firstName = 'Alex';
  user.lastName = 'Dudnikov';
  user.password = 'userPassword1';
  user.email = 'alekdudnikov@mail.ru';
  user.DoB = new Date();
});

export const usersRepository = appDataSource.getRepository(User);

export default connection;
