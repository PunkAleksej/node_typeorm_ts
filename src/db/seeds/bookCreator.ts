import { genreRepository, booksRepository, authorRepository } from '../index';
import { connect } from '../dataSource';
import { Book } from '../entity/Book';

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
  (() => {
    for (let j = 0; j < createGenres.length; j++) {
      const createGenre = createGenres[j];
      const genreInst = genreRepository.create({ name: createGenre });
      // eslint-disable-next-line no-await-in-loop
      genreRepository.save(genreInst);
    }
  })();

  // const createAuthors = [
  //   'C. S. Lewis',
  //   'Morgan Housel',
  //   'Oscar Wilde',
  //   'Mark Manson',
  //   'J. R. R. Tolkien',
  //   'Morgan Black',
  //   'C. S. Stanford',
  //   'Cisco Gomez',
  //   'Dale Carnegie',
  //   'Herman Melville',
  // ];
  // (() => {
  //   for (let i = 0; i < createAuthors.length; i++) {
  //     const createAuthor = createAuthors[i];
  //     const authorInst = authorRepository.create({ name: createAuthor });
  //     // eslint-disable-next-line no-await-in-loop
  //     authorRepository.save(authorInst);
  //   }
  // })();

  const books = [
    {
      name: 'The Chronicles of Narnia',
      author: 'C. S. Lewis',
      description: `Lorem ipsum dolor sit amet consectetur, 
        adipisicing elit. Dignissimos rerum autem quasi dolore eos a nemo, 
        fugiat tenetur exercitationem quia nesciunt distinctio excepturi 
        in quaerat doloremque aliquid aspernatur dolorum hic!`,
      price: 699,
      paperPrice: 399,
      cover: 'TheChroniclesofNarnia.png',
      genres: ['Fiction', 'Science-fiction', 'Satire'],
      releasedAt: new Date(1975, 11, 17),
    },
    {
      name: 'The Psychlogy of Money',
      author: 'Morgan Housel',
      description: `Lorem ipsum dolor sit amet consectetur, 
        adipisicing elit. Dignissimos rerum autem quasi dolore eos a nemo, 
        fugiat tenetur exercitationem quia nesciunt distinctio excepturi 
        in quaerat doloremque aliquid aspernatur dolorum hic! Lorem ipsum dolor sit amet consectetur, 
        adipisicing elit. Dignissimos rerum autem quasi dolore eos a nemo, 
        fugiat.`,
      price: 999,
      paperPrice: 599,
      cover: 'ThePsychlogyofMoney.png',
      genres: ['Fantasy', 'Light fiction'],
      releasedAt: new Date(1978, 11, 17),
    },
    {
      name: 'The Picture of Dorian Gray',
      author: 'Oscar Wilde',
      description: `Lorem ipsum dolor sit amet consectetur, 
        adipisicing elit. Dignissimos rerum autem quasi dolore eos a nemo, 
        fugiat tenetur exercitationem quia nesciunt distinctio excepturi 
        in quaerat doloremque aliquid aspernatur dolorum hic!`,
      price: 899,
      paperPrice: 499,
      cover: 'ThePictureofDorianGray.png',
      genres: ['Politics', 'History'],
      releasedAt: new Date(2021, 11, 17),
    },
    {
      name: 'The Subtle art of not giving a fuck',
      author: 'Mark Manson',
      description: `Lorem ipsum dolor sit amet consectetur, 
        adipisicing elit. Dignissimos rerum autem quasi dolore eos a nemo, 
        fugiat tenetur exercitationem quia nesciunt distinctio excepturi 
        in quaerat doloremque aliquid aspernatur dolorum hic!`,
      price: 299,
      paperPrice: 199,
      cover: 'TheSubtleartofnotgivingafuck.png',
      genres: ['History', 'Light fiction', 'Health'],
      releasedAt: new Date(2011, 11, 17),
    },
    {
      name: 'The Two towers',
      author: 'J. R. R. Tolkien',
      description: `Lorem ipsum dolor sit amet consectetur, 
        adipisicing elit. Dignissimos rerum autem quasi dolore eos a nemo, 
        fugiat tenetur exercitationem quia nesciunt distinctio excepturi 
        in quaerat doloremque aliquid aspernatur dolorum hic!`,
      price: 5999,
      paperPrice: 4199,
      cover: 'TheTwotowers.png',
      genres: ['Health', 'Encyclopedia'],
      releasedAt: new Date(2022, 7, 17),
    },
    {
      name: 'Book of Fairy Tales',
      author: 'Morgan Housel',
      description: `Lorem ipsum dolor sit amet consectetur, 
        adipisicing elit. Dignissimos rerum autem quasi dolore eos a nemo, 
        fugiat tenetur exercitationem quia nesciunt distinctio excepturi 
        in quaerat doloremque aliquid aspernatur dolorum hic!`,
      price: 6899,
      paperPrice: 5199,
      cover: 'BookofFairyTales.png',
      genres: ['Encyclopedia', 'Science-fiction', 'Satire'],
      releasedAt: new Date(2021, 11, 17),
    },
    {
      name: 'The Psychlogy of Money',
      author: 'Mark Manson',
      description: `Lorem ipsum dolor sit amet consectetur, 
        adipisicing elit. Dignissimos rerum autem quasi dolore eos a nemo, 
        fugiat tenetur exercitationem quia nesciunt distinctio excepturi 
        in quaerat doloremque aliquid aspernatur dolorum hic!`,
      price: 599,
      paperPrice: 499,
      cover: 'ThePsychlogyofMoney.png',
      genres: ['Health', 'Encyclopedia', 'Science-fiction'],
      releasedAt: new Date(2022, 5, 17),
    },
    {
      name: 'The Chronicles of Narnia',
      author: 'C. S. Lewis',
      description: `Lorem ipsum dolor sit amet consectetur, 
        adipisicing elit. Dignissimos rerum autem quasi dolore eos a nemo, 
        fugiat tenetur exercitationem quia nesciunt distinctio excepturi 
        in quaerat doloremque aliquid aspernatur dolorum hic!`,
      price: 4499,
      paperPrice: 4199,
      cover: 'TheChroniclesofNarnia.png',
      genres: ['Children`s books', 'Encyclopedia', 'Politics'],
      releasedAt: new Date(2018, 11, 17),
    },
    {
      name: 'Moby Dick',
      author: 'Morgan Housel',
      description: `Lorem ipsum dolor sit amet consectetur, 
        adipisicing elit. Dignissimos rerum autem quasi dolore eos a nemo, 
        fugiat tenetur exercitationem quia nesciunt distinctio excepturi 
        in quaerat doloremque aliquid aspernatur dolorum hic! Lorem ipsum dolor sit amet consectetur.`,
      price: 6899,
      paperPrice: 5799,
      cover: 'MobyDick.png',
      genres: ['Politics', 'Fantasy', 'Horror'],
      releasedAt: new Date(2011, 11, 17),
    },
    {
      name: 'The Chronicles of Topol',
      author: 'Morgan Black',
      description: `Lorem ipsum dolor sit amet consectetur, 
        adipisicing elit. Dignissimos rerum autem quasi dolore eos a nemo, 
        fugiat tenetur exercitationem quia nesciunt distinctio excepturi 
        in quaerat doloremque aliquid aspernatur dolorum hic!`,
      price: 1999,
      paperPrice: 1899,
      cover: 'TheChroniclesofNarnia.png',
      genres: ['Horror', 'Romance', 'Autobiography', 'Travel books'],
      releasedAt: new Date(2004, 11, 17),
    },
    {
      name: 'The Crying book',
      author: 'C. S. Lewis',
      description: `Lorem ipsum dolor sit amet consectetur, 
        adipisicing elit. Dignissimos rerum autem quasi dolore eos a nemo, 
        fugiat tenetur exercitationem quia nesciunt distinctio excepturi 
        in quaerat doloremque aliquid aspernatur dolorum hic!`,
      price: 1499,
      paperPrice: 1299,
      cover: 'TheCryingbook.png',
      genres: ['History', 'Thriller'],
      releasedAt: new Date(2022, 6, 17),
    },
    {
      name: 'The Funny book',
      author: 'C. S. Stanford',
      description: `Lorem ipsum dolor sit amet consectetur, 
        adipisicing elit. Dignissimos rerum autem quasi dolore eos a nemo, 
        fugiat tenetur exercitationem quia nesciunt distinctio excepturi 
        in quaerat doloremque aliquid aspernatur dolorum hic! Dignissimos rerum autem quasi dolore eos a nemo, 
        fugiat tenetur exercitationem quia nesciunt distinctio excepturi`,
      price: 2299,
      paperPrice: 1199,
      cover: 'TheCryingbook.png',
      genres: ['History', 'Thriller', 'Romance'],
      releasedAt: new Date(2013, 11, 17),
    },
    {
      name: 'The Kill',
      author: 'Cisco Gomez',
      description: `Lorem ipsum dolor sit amet consectetur, 
        adipisicing elit. Dignissimos rerum autem quasi dolore eos a nemo, 
        fugiat tenetur exercitationem quia nesciunt distinctio excepturi 
        in quaerat doloremque aliquid aspernatur dolorum hic! Dignissimos rerum!`,
      price: 3499,
      paperPrice: 2499,
      cover: 'TheWeightofThings.png',
      genres: ['Light fiction', 'Science-fiction'],
      releasedAt: new Date(1994, 11, 17),
    },
    {
      name: 'How to stop worrying and start living',
      author: 'Dale Carnegie',
      description: `Lorem ipsum dolor sit amet consectetur, 
        adipisicing elit. Dignissimos rerum autem quasi dolore eos a nemo, 
        fugiat tenetur exercitationem quia nesciunt distinctio excepturi 
        in quaerat doloremque aliquid aspernatur dolorum hic!`,
      price: 1999,
      paperPrice: 1599,
      cover: 'Howtostopworryingandstartliving.png',
      genres: ['History', 'Thriller', 'Romance', 'Travel books'],
      releasedAt: new Date(2001, 11, 17),
    },
    {
      name: 'Dont sweat the Small Stuuff',
      author: 'Cisco Gomez',
      description: `Lorem ipsum dolor sit amet consectetur, 
        adipisicing elit. Dignissimos rerum autem quasi dolore eos a nemo, 
        fugiat tenetur exercitationem quia nesciunt distinctio excepturi 
        in quaerat doloremque aliquid aspernatur dolorum hic! Lorem ipsum dolor sit amet consectetur, 
        orem ipsum dolor sit amet consectetur`,
      price: 999,
      paperPrice: 899,
      cover: 'DontsweattheSmallStuuff.png',
      genres: ['History', 'Thriller', 'Encyclopedia', 'Autobiography'],
      releasedAt: new Date(1995, 4, 17),
    },
    {
      name: 'The Chronicles of Narnia',
      author: 'C. S. Lewis',
      description: `Lorem ipsum dolor sit amet consectetur, 
        adipisicing elit. Dignissimos rerum autem quasi dolore eos a nemo, 
        fugiat tenetur exercitationem quia nesciunt distinctio excepturi 
        in quaerat doloremque aliquid aspernatur dolorum hic!`,
      price: 1099,
      paperPrice: 1099,
      cover: 'TheChroniclesofNarnia.png',
      genres: ['Health', 'Encyclopedia'],
      releasedAt: new Date(1998, 3, 17),
    },
    {
      name: 'The Weight of Things',
      author: 'Herman Melville',
      description: `Lorem ipsum dolor sit amet consectetur, 
        adipisicing elit. Dignissimos rerum autem quasi dolore eos a nemo, 
        fugiat tenetur exercitationem quia nesciunt distinctio excepturi 
        in quaerat doloremque aliquid aspernatur dolorum hic!`,
      price: 4199,
      paperPrice: 3799,
      cover: 'TheWeightofThings.png',
      genres: ['Health', 'Encyclopedia', 'Non—fiction'],
      releasedAt: new Date(2021, 12, 17),
    },
    {
      name: 'The Chronicles of Narnia',
      author: 'C. S. Lewis',
      description: `Lorem ipsum dolor sit amet consectetur, 
        adipisicing elit. Dignissimos rerum autem quasi dolore eos a nemo, 
        fugiat tenetur exercitationem quia nesciunt distinctio excepturi 
        in quaerat doloremque aliquid aspernatur dolorum hic!`,
      price: 1699,
      paperPrice: 1399,
      cover: 'TheChroniclesofNarnia.png',
      genres: ['Fiction', 'Science-fiction', 'Satire'],
      releasedAt: new Date(1995, 11, 17),
    },
    {
      name: 'The Psychlogy of Money',
      author: 'Morgan Housel',
      description: `Lorem ipsum dolor sit amet consectetur, 
        adipisicing elit. Dignissimos rerum autem quasi dolore eos a nemo, 
        fugiat tenetur exercitationem quia nesciunt distinctio excepturi 
        in quaerat doloremque aliquid aspernatur dolorum hic! Lorem ipsum dolor sit amet consectetur, 
        adipisicing elit. Dignissimos rerum autem quasi dolore eos a nemo, 
        fugiat.`,
      price: 1999,
      paperPrice: 1599,
      cover: 'ThePsychlogyofMoney.png',
      genres: ['Fantasy', 'Light fiction'],
      releasedAt: new Date(1998, 11, 17),
    },
    {
      name: 'The Picture of Dorian Gray',
      author: 'Oscar Wilde',
      description: `Lorem ipsum dolor sit amet consectetur, 
        adipisicing elit. Dignissimos rerum autem quasi dolore eos a nemo, 
        fugiat tenetur exercitationem quia nesciunt distinctio excepturi 
        in quaerat doloremque aliquid aspernatur dolorum hic!`,
      price: 1899,
      paperPrice: 1499,
      cover: 'ThePictureofDorianGray.png',
      genres: ['Politics', 'History'],
      releasedAt: new Date(2005, 11, 17),
    },
    {
      name: 'The Subtle art of not giving a fuck',
      author: 'Mark Manson',
      description: `Lorem ipsum dolor sit amet consectetur, 
        adipisicing elit. Dignissimos rerum autem quasi dolore eos a nemo, 
        fugiat tenetur exercitationem quia nesciunt distinctio excepturi 
        in quaerat doloremque aliquid aspernatur dolorum hic!`,
      price: 1299,
      paperPrice: 899,
      cover: 'TheSubtleartofnotgivingafuck.png',
      genres: ['History', 'Light fiction', 'Health'],
      releasedAt: new Date(2011, 11, 17),
    },
    {
      name: 'The Two towers',
      author: 'J. R. R. Tolkien',
      description: `Lorem ipsum dolor sit amet consectetur, 
        adipisicing elit. Dignissimos rerum autem quasi dolore eos a nemo, 
        fugiat tenetur exercitationem quia nesciunt distinctio excepturi 
        in quaerat doloremque aliquid aspernatur dolorum hic!`,
      price: 2999,
      paperPrice: 1199,
      cover: 'TheTwotowers.png',
      genres: ['Health', 'Encyclopedia'],
      releasedAt: new Date(2022, 7, 17),
    },
    {
      name: 'Book of Fairy Tales',
      author: 'Morgan Housel',
      description: `Lorem ipsum dolor sit amet consectetur, 
        adipisicing elit. Dignissimos rerum autem quasi dolore eos a nemo, 
        fugiat tenetur exercitationem quia nesciunt distinctio excepturi 
        in quaerat doloremque aliquid aspernatur dolorum hic!`,
      price: 3899,
      paperPrice: 2199,
      cover: 'BookofFairyTales.png',
      genres: ['Encyclopedia', 'Science-fiction', 'Satire'],
      releasedAt: new Date(2021, 11, 17),
    },
    {
      name: 'The Psychlogy of Money',
      author: 'Mark Manson',
      description: `Lorem ipsum dolor sit amet consectetur, 
        adipisicing elit. Dignissimos rerum autem quasi dolore eos a nemo, 
        fugiat tenetur exercitationem quia nesciunt distinctio excepturi 
        in quaerat doloremque aliquid aspernatur dolorum hic!`,
      price: 1299,
      paperPrice: 1199,
      cover: 'ThePsychlogyofMoney.png',
      genres: ['Health', 'Encyclopedia', 'Science-fiction'],
      releasedAt: new Date(2022, 5, 17),
    },
    {
      name: 'The Chronicles of Narnia',
      author: 'C. S. Lewis',
      description: `Lorem ipsum dolor sit amet consectetur, 
        adipisicing elit. Dignissimos rerum autem quasi dolore eos a nemo, 
        fugiat tenetur exercitationem quia nesciunt distinctio excepturi 
        in quaerat doloremque aliquid aspernatur dolorum hic!`,
      price: 2499,
      paperPrice: 2199,
      cover: 'TheChroniclesofNarnia.png',
      genres: ['Children`s books', 'Encyclopedia', 'Politics'],
      releasedAt: new Date(2018, 11, 17),
    },
    {
      name: 'Moby Dick',
      author: 'Morgan Housel',
      description: `Lorem ipsum dolor sit amet consectetur, 
        adipisicing elit. Dignissimos rerum autem quasi dolore eos a nemo, 
        fugiat tenetur exercitationem quia nesciunt distinctio excepturi 
        in quaerat doloremque aliquid aspernatur dolorum hic! Lorem ipsum dolor sit amet consectetur.`,
      price: 3899,
      paperPrice: 2799,
      cover: 'MobyDick.png',
      genres: ['Politics', 'Fantasy', 'Horror'],
      releasedAt: new Date(2016, 11, 17),
    },
    {
      name: 'The Chronicles of Topol',
      author: 'Morgan Black',
      description: `Lorem ipsum dolor sit amet consectetur, 
        adipisicing elit. Dignissimos rerum autem quasi dolore eos a nemo, 
        fugiat tenetur exercitationem quia nesciunt distinctio excepturi 
        in quaerat doloremque aliquid aspernatur dolorum hic!`,
      price: 1999,
      paperPrice: 1899,
      cover: 'TheChroniclesofNarnia.png',
      genres: ['Horror', 'Romance', 'Autobiography', 'Travel books'],
      releasedAt: new Date(2004, 11, 17),
    },
    {
      name: 'The Crying book',
      author: 'C. S. Lewis',
      description: `Lorem ipsum dolor sit amet consectetur, 
        adipisicing elit. Dignissimos rerum autem quasi dolore eos a nemo, 
        fugiat tenetur exercitationem quia nesciunt distinctio excepturi 
        in quaerat doloremque aliquid aspernatur dolorum hic!`,
      price: 1699,
      paperPrice: 1399,
      cover: 'TheCryingbook.png',
      genres: ['History', 'Thriller'],
      releasedAt: new Date(2022, 6, 17),
    },
    {
      name: 'The Funny book',
      author: 'C. S. Stanford',
      description: `Lorem ipsum dolor sit amet consectetur, 
        adipisicing elit. Dignissimos rerum autem quasi dolore eos a nemo, 
        fugiat tenetur exercitationem quia nesciunt distinctio excepturi 
        in quaerat doloremque aliquid aspernatur dolorum hic! Dignissimos rerum autem quasi dolore eos a nemo, 
        fugiat tenetur exercitationem quia nesciunt distinctio excepturi`,
      price: 2299,
      paperPrice: 1199,
      cover: 'TheCryingbook.png',
      genres: ['History', 'Thriller', 'Romance'],
      releasedAt: new Date(2013, 11, 17),
    },
    {
      name: 'The Kill',
      author: 'Cisco Gomez',
      description: `Lorem ipsum dolor sit amet consectetur, 
        adipisicing elit. Dignissimos rerum autem quasi dolore eos a nemo, 
        fugiat tenetur exercitationem quia nesciunt distinctio excepturi 
        in quaerat doloremque aliquid aspernatur dolorum hic! Dignissimos rerum!`,
      price: 2699,
      paperPrice: 2299,
      cover: 'TheWeightofThings.png',
      genres: ['Light fiction', 'Science-fiction'],
      releasedAt: new Date(1994, 11, 17),
    },
    {
      name: 'How to stop worrying and start living',
      author: 'Dale Carnegie',
      description: `Lorem ipsum dolor sit amet consectetur, 
        adipisicing elit. Dignissimos rerum autem quasi dolore eos a nemo, 
        fugiat tenetur exercitationem quia nesciunt distinctio excepturi 
        in quaerat doloremque aliquid aspernatur dolorum hic!`,
      price: 1899,
      paperPrice: 1599,
      cover: 'Howtostopworryingandstartliving.png',
      genres: ['History', 'Thriller', 'Romance', 'Travel books'],
      releasedAt: new Date(2001, 11, 17),
    },
    {
      name: 'Dont sweat the Small Stuuff',
      author: 'Cisco Gomez',
      description: `Lorem ipsum dolor sit amet consectetur, 
        adipisicing elit. Dignissimos rerum autem quasi dolore eos a nemo, 
        fugiat tenetur exercitationem quia nesciunt distinctio excepturi 
        in quaerat doloremque aliquid aspernatur dolorum hic! Lorem ipsum dolor sit amet consectetur, 
        orem ipsum dolor sit amet consectetur`,
      price: 1299,
      paperPrice: 1199,
      cover: 'DontsweattheSmallStuuff.png',
      genres: ['History', 'Thriller', 'Encyclopedia', 'Autobiography'],
      releasedAt: new Date(1995, 4, 17),
    },
    {
      name: 'The Chronicles of Narnia',
      author: 'C. S. Lewis',
      description: `Lorem ipsum dolor sit amet consectetur, 
        adipisicing elit. Dignissimos rerum autem quasi dolore eos a nemo, 
        fugiat tenetur exercitationem quia nesciunt distinctio excepturi 
        in quaerat doloremque aliquid aspernatur dolorum hic!`,
      price: 1699,
      paperPrice: 1399,
      cover: 'TheChroniclesofNarnia.png',
      genres: ['Health', 'Encyclopedia'],
      releasedAt: new Date(1998, 3, 17),
    },
    {
      name: 'The Weight of Things',
      author: 'Herman Melville',
      description: `Lorem ipsum dolor sit amet consectetur, 
        adipisicing elit. Dignissimos rerum autem quasi dolore eos a nemo, 
        fugiat tenetur exercitationem quia nesciunt distinctio excepturi 
        in quaerat doloremque aliquid aspernatur dolorum hic!`,
      price: 3199,
      paperPrice: 2799,
      cover: 'TheWeightofThings.png',
      genres: ['Health', 'Encyclopedia', 'Non—fiction'],
      releasedAt: new Date(2021, 12, 17),
    },
  ];

  const createBookTable = async () => {
    const genres = await genreRepository.find();
    const authors = await authorRepository.find();
    for (let i = 0; i < books.length; i++) {
      const book = books[i];
      const createdBook = new Book();
      createdBook.name = book.name;
      createdBook.author = book.author; //  authors.find((author) => author.name === book.author);
      createdBook.description = book.description;
      createdBook.cover = book.cover;
      createdBook.paperPrice = book.paperPrice;
      createdBook.releasedAt = book.releasedAt;
      createdBook.price = book.price;
      createdBook.genres = book.genres.map((genre) => {
        return genres.find((g) => g.name === genre);
      });
      const bookInst = booksRepository.create(createdBook);
      // eslint-disable-next-line no-await-in-loop
      await booksRepository.save(bookInst);
    }
  };
  setTimeout(createBookTable, 1000);
})();
