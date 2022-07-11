import { ErrorRequestHandler } from 'express';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  const { statusCode = 500 } = err;

  if (err.customErrorData) {
    return res
      .status(statusCode)
      .json(err.customErrorData);
  }

  return res
    .status(500)
    .json({ message: 'unknown error' });
};

export default errorHandler;
