import dotenv from 'dotenv';
import path from 'path';

const localConfig = dotenv.config({ path: path.normalize(`${__dirname}/../.env`) }).parsed;
const defaultConfig = dotenv.config({ path: path.normalize(`${__dirname}/../default.env`) }).parsed;

if (!localConfig) {
  console.warn('.env file missed');
}

const parsedEnv = {
  ...defaultConfig,
  ...localConfig,
};

const config = {
  db: {
    type: parsedEnv.DB_TYPE as 'postgres',
    host: parsedEnv.DB_HOST,
    port: +parsedEnv.DB_PORT,
    userName: parsedEnv.DB_USERNAME,
    password: parsedEnv.DB_PASSWORD,
    dataBase: parsedEnv.DB_DATABASE,
  },
  port: +parsedEnv.CONNECTION_PORT,
  passwordSecretKey: parsedEnv.PASSWORD_SALT,
  tokenSecretKey: parsedEnv.JWT_TOKEN_SECRET_KEY,
  tokenExpiresTime: parsedEnv.TOKEN_EXPIRES_TIME,
  currentURL: parsedEnv.CURRENT_URL,
  hashAlgorithm: parsedEnv.HASH_ALGORITHM,
};

export default config;
