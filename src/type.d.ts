import { User } from './db/User';

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}
