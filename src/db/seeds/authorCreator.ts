import { authorRepository } from '../index';
import { connect } from '../dataSource';

(async () => {
  await connect();
  const createAuthors = [
    'C. S. Lewis',
    'Morgan Housel',
    'Oscar Wilde',
    'Mark Manson',
    'J. R. R. Tolkien',
    'Morgan Black',
    'C. S. Stanford',
    'Cisco Gomez',
    'Dale Carnegie',
    'Herman Melville',
  ];
  (async () => {
    for (let i = 0; i < createAuthors.length; i++) {
      const createAuthor = createAuthors[i];
      const authorInst = authorRepository.create({ name: createAuthor });
      // eslint-disable-next-line no-await-in-loop
      await authorRepository.save(authorInst);
    }
  })();
})();
