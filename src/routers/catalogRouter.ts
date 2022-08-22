import Router from 'express';
import validatorCreate from '../middlewares/validators/validatorCreate';
import signUpSchema from '../middlewares/validators/schemas/signUpSchema';
import booksFilter from '../controllers/catalog/booksFilter';
import createBook from '../controllers/catalog/createBook';
import createBookSchema from '../middlewares/validators/schemas/createBookSchema';

const catalogRouter = Router();

catalogRouter.post('/filter', validatorCreate(signUpSchema), booksFilter);

catalogRouter.post('/create', validatorCreate(createBookSchema), createBook);

export default catalogRouter;
