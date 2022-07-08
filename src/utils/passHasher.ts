import * as crypto from 'crypto';
import config from '../config';

const passHasher = (password: string) => {
  return crypto
    .createHmac(config.hashAlgorithm, password)
    .update(config.passwordSecretKey)
    .digest('hex');
};

const validatePassword = (password: string, hashedPassword: string): boolean => {
  return passHasher(password) === hashedPassword;
};

export default { passHasher, validatePassword };
