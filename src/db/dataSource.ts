import 'reflect-metadata';
import { DataSource } from 'typeorm';
import config from '../config';

export const appDataSource = new DataSource({
  type: config.db.type,
  host: config.db.host,
  port: config.db.port,
  username: config.db.userName,
  password: config.db.password,
  database: config.db.dataBase,
  synchronize: false,
  logging: config.db.logging,
  entities: [`${__dirname}/entity/*`],
  migrations: [`${__dirname}/migrations/*`],
  subscribers: [],
});

export const connect = () => {
  return appDataSource.initialize();
};
