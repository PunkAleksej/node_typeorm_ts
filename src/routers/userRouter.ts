import Router from 'express';

import deleteUser from '../controllers/users/deleteUser';
import updateUser from '../controllers/users/update';
import getUser from '../controllers/users/getMe';
import getAllUsers from '../controllers/users/getAllUsers';
import jwtCheker from '../middlewares/authChecker';

const userRouter = Router();

userRouter.delete('/:id', jwtCheker, deleteUser);

userRouter.patch('/:id', jwtCheker, updateUser);

userRouter.get('/:id', getUser);

userRouter.get('/all', jwtCheker, getAllUsers);

export default userRouter;
