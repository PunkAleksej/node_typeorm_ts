import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from './User';
import config from '../config';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: config.db.host,
  port: config.db.port,
  username: config.db.userName,
  password: config.db.password,
  database: config.db.dataBase,
  synchronize: false,
  logging: false,
  entities: [User],
  migrations: [`${__dirname}/migrations/*`],
  subscribers: [],
});

export const connect = () => {
  return AppDataSource.initialize();
};

export const usersRepository = AppDataSource.getRepository(User);
