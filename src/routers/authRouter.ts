import Router from 'express';
import signUp from '../controllers/login/signUp';
import signIn from '../controllers/login/signIn';
import signInSchema from '../middlewares/validators/schemas/signInSchema';
import validatorCreate from '../middlewares/validators/validatorCreate';
import signUpSchema from '../middlewares/validators/schemas/signUpSchema';

const authRouter = Router();

authRouter.post('/sign-up', validatorCreate(signUpSchema), signUp);

authRouter.post('/sign-in', validatorCreate(signInSchema), signIn);

export default authRouter;
