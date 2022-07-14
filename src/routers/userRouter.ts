import Router from 'express';

import deleteUser from '../controllers/users/deleteUser';
import updateUser from '../controllers/users/update';
import getUser from '../controllers/auth/getMe';
import getAllUsers from '../controllers/users/getAllUsers';
import jwtCheker from '../middlewares/authChecker';
import changePass from '../controllers/users/changePass';
import validatorCreate from '../middlewares/validators/validatorCreate';
import changePassSchema from '../middlewares/validators/schemas/changePassSchema';

const userRouter = Router();

userRouter.delete('/:id', jwtCheker, deleteUser);

userRouter.patch('/:id', jwtCheker, updateUser);

userRouter.get('/:id', getUser);

userRouter.post('/all', jwtCheker, getAllUsers);

userRouter.post('/change-pass', [jwtCheker, validatorCreate(changePassSchema)], changePass);
export default userRouter;
