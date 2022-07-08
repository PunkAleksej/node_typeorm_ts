import { AppDataSource } from './dataSource';
import { User } from './User';

const connection = AppDataSource.initialize().then(async () => {
  const user = new User();
  user.firstName = 'Alex';
  user.lastName = 'Dudnikov';
  user.password = 'userPassword1';
  user.email = 'alekdudnikov@mail.ru';
  await AppDataSource.manager.save(user);
});

export default connection;
