import Router from 'express';
import signUp from '../controllers/login/signUp';
import signIn from '../controllers/login/signIn';
import testToken from '../controllers/login/testToken';
import signInSchema from '../middlewares/validators/schemas/signInSchema';
import validatorCreate from '../middlewares/validators/createValidate';
import signUpSchema from '../middlewares/validators/schemas/signUpSchema';

const authRouter = Router();

authRouter.post('/sign-up', validatorCreate(signUpSchema), signUp);

authRouter.post('/sign-in', validatorCreate(signInSchema), signIn);

authRouter.post('/test-login', testToken);

export default authRouter;
