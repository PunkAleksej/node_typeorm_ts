import express from 'express';
import cors from 'cors';
import userRouter from './routers/userRouter';
import authRouter from './routers/authRouter';
import errorHandler from './middlewares/errorHandler';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type from './type';

const app = express();
app.use(cors({
  origin: 'http://localhost:3000',
}));

app.use('/static', express.static('/home/fusion_tech/node/typeNode/public/'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json({
  limit: '20mb',
}));

app.use('/user', userRouter);
app.use('/auth', authRouter);
app.use(errorHandler);

export default app;
