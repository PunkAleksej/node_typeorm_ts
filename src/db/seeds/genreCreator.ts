import { genreRepository } from '../index';
import { connect } from '../dataSource';

(async () => {
  await connect();
  const createGenres = [
    'Fiction',
    'Non—fiction',
    'Light fiction',
    'Science-fiction',
    'Fantasy',
    'Business & Finance',
    'Politics',
    'Travel books',
    'Autobiography',
    'History',
    'Thriller',
    'Mystery',
    'Romance',
    'Satire',
    'Horror',
    'Health',
    'Children`s books',
    'Encyclopedia',
  ];
  (async () => {
    for (let i = 0; i < createGenres.length; i++) {
      const createGenre = createGenres[i];
      const genreInst = genreRepository.create({ name: createGenre });
      // eslint-disable-next-line no-await-in-loop
      await genreRepository.save(genreInst);
    }
  })();
})();
