import { appDataSource } from './dataSource';
import { Author } from './entity/Author';
import { Book } from './entity/Book';
import { Genre } from './entity/Genre';
import { Photo } from './entity/Photo';
import { Rating } from './entity/Rating';
import { User } from './entity/User';

export const usersRepository = appDataSource.getRepository(User);
export const booksRepository = appDataSource.getRepository(Book);
export const ratingRepository = appDataSource.getRepository(Rating);
export const authorRepository = appDataSource.getRepository(Author);
export const photoRepository = appDataSource.getRepository(Photo);
export const genreRepository = appDataSource.getRepository(Genre);

const db = {
  usersRepository: appDataSource.getRepository(User),
  booksRepository: appDataSource.getRepository(Book),
  ratingRepository: appDataSource.getRepository(Rating),
  photoRepository: appDataSource.getRepository(Photo),
  genreRepository: appDataSource.getRepository(Genre),
};

export default db;
