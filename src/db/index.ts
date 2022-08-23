import { appDataSource } from './dataSource';
import { Author } from './entity/Author';
import { Book } from './entity/Book';
import { Genre } from './entity/Genre';
import { Rating } from './entity/Rating';
import { User } from './entity/User';

export const usersRepository = appDataSource.getRepository(User);
export const booksRepository = appDataSource.getRepository(Book);
export const ratingRepository = appDataSource.getRepository(Rating);
export const authorRepository = appDataSource.getRepository(Author);
export const genreRepository = appDataSource.getRepository(Genre);
