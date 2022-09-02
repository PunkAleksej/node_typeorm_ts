import Router from 'express';
import validatorCreate from '../middlewares/validators/validatorCreate';
import addBookInCartSchema from '../middlewares/validators/schemas/addBookInCartSchema';
import booksFilter from '../controllers/catalog/booksFilter';
import createBook from '../controllers/catalog/createBook';
import createBookSchema from '../middlewares/validators/schemas/createBookSchema';
import createRating from '../controllers/catalog/createRating';
import ratingSchema from '../middlewares/validators/schemas/ratingSchema';
import jwtCheker from '../middlewares/authChecker';
import getBook from '../controllers/catalog/getBook';
import getGenreList from '../controllers/catalog/getGenresList';
import addToCart from '../controllers/catalog/addToCart';
import getBooksById from '../controllers/catalog/getBooksById';

const catalogRouter = Router();

catalogRouter.get('/filter', booksFilter);

catalogRouter.post('/create', validatorCreate(createBookSchema), createBook);

catalogRouter.post('/rating', validatorCreate(ratingSchema), jwtCheker, createRating);

catalogRouter.post('/cart', validatorCreate(addBookInCartSchema), jwtCheker, addToCart);

catalogRouter.post('/cart-books', jwtCheker, getBooksById);

catalogRouter.get('/getBook', getBook);

catalogRouter.get('/getGenres', getGenreList);
export default catalogRouter;
