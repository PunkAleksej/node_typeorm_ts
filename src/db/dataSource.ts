import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from './User';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'fusion',
  database: 'testdb',
  synchronize: false,
  logging: false,
  entities: [User],
  migrations: [],
  subscribers: [],
});

export const connect = () => {
  return AppDataSource.initialize();
};

export const usersRepository = AppDataSource.getRepository(User);
