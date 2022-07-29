import Router from 'express';
import signUp from '../controllers/auth/signUp';
import signIn from '../controllers/auth/signIn';
import getMe from '../controllers/auth/getMe';
import signInSchema from '../middlewares/validators/schemas/signInSchema';
import validatorCreate from '../middlewares/validators/validatorCreate';
import signUpSchema from '../middlewares/validators/schemas/signUpSchema';
import jwtCheker from '../middlewares/authChecker';

const authRouter = Router();

authRouter.post('/sign-up', validatorCreate(signUpSchema), signUp);

authRouter.post('/sign-in', validatorCreate(signInSchema), signIn);

authRouter.get('/me', jwtCheker, getMe);

export default authRouter;
