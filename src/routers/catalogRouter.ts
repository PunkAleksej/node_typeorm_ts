import Router from 'express';
import validatorCreate from '../middlewares/validators/validatorCreate';
import signUpSchema from '../middlewares/validators/schemas/signUpSchema';
import booksFilter from '../controllers/catalog/booksFilter';

const catalogRouter = Router();

catalogRouter.post('/filter', validatorCreate(signUpSchema), booksFilter);

export default catalogRouter;
