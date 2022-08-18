import express from 'express';
import cors from 'cors';
import path from 'path';
import userRouter from './routers/userRouter';
import authRouter from './routers/authRouter';
import catalogRouter from './routers/catalogRouter';
import errorHandler from './middlewares/errorHandler';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type from './type';

const app = express();
app.use(cors({
  origin: 'http://localhost:3000',
}));

app.use('/static', express.static(path.resolve(__dirname, '../public')));
app.use(express.urlencoded({ extended: false }));
app.use(express.json({
  limit: '20mb',
}));

app.use('/user', userRouter);
app.use('/auth', authRouter);
app.use('/catalog', catalogRouter);
app.use(errorHandler);

export default app;
