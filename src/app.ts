import express from 'express';
import userRouter from './routers/userRouter';
import authRouter from './routers/authRouter';

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/user', userRouter);
app.use('/auth', authRouter);

export default app;
