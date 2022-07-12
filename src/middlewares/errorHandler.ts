import { ErrorRequestHandler, NextFunction } from 'express';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const errorHandler: ErrorRequestHandler = (
  err, req, res, next: NextFunction,
) => {
  if (err.customErrorData) {
    return res
      .status(err.customErrorData.code)
      .json(err.customErrorData);
  }

  return res
    .status(500)
    .json({ message: 'unknown error' });
};

export default errorHandler;
