import express from 'express';
import userRouter from './routers/userRouter';
import authRouter from './routers/authRouter';
import errorHandler from './middlewares/errorHandler';
import type from './type';

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/user', userRouter);
app.use('/auth', authRouter);
app.use(errorHandler);

export default app;
