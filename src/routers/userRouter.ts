import Router from 'express';

import deleteUser from '../controllers/users/deleteUser';
import updateUser from '../controllers/users/update';
import getUser from '../controllers/users/getMe';
import getAllUsers from '../controllers/users/getAllUsers';

const userRouter = Router();

userRouter.delete('/:id', deleteUser);

userRouter.patch('/:id', updateUser);

userRouter.get('/:id', getUser);

userRouter.get('/all/:id', getAllUsers);

export default userRouter;
