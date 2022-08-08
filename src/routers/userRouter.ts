import Router from 'express';

import deleteUser from '../controllers/users/deleteUser';
import updateUser from '../controllers/users/update';
import getUser from '../controllers/auth/getMe';
import getAllUsers from '../controllers/users/usersFilter';
import jwtCheker from '../middlewares/authChecker';
import changePass from '../controllers/users/changePass';
import validatorCreate from '../middlewares/validators/validatorCreate';
import changePassSchema from '../middlewares/validators/schemas/changePassSchema';
import updateSchema from '../middlewares/validators/schemas/updateSchema';
import filterSchema from '../middlewares/validators/schemas/filterSchema';
import deleteSchema from '../middlewares/validators/schemas/deleteSchema';
import getUserSchema from '../middlewares/validators/schemas/getUser';
import updatePhoto from '../controllers/users/updatePhoto';

const userRouter = Router();

userRouter.use(jwtCheker);

userRouter.post('/change-pass', validatorCreate(changePassSchema), changePass);

userRouter.patch('/update-photo', validatorCreate(updateSchema), updatePhoto);

userRouter.patch('/:id', validatorCreate(updateSchema), updateUser);

userRouter.delete('/:id', validatorCreate(deleteSchema), deleteUser);

userRouter.get('/:id', validatorCreate(getUserSchema), getUser);

userRouter.get('/filter', validatorCreate(filterSchema), getAllUsers);

export default userRouter;
