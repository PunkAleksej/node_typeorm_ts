import { ErrorRequestHandler, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

interface ExtendedError extends Error {
  customErrorData?: {
    code: number;
    message: string;
    payload: object;
  },
}

const errorHandler: ErrorRequestHandler = (
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  err: ExtendedError, req: never, res, next: NextFunction,
) => {
  if (err.customErrorData) {
    if (!err.customErrorData.payload) {
      // eslint-disable-next-line no-param-reassign
      err.customErrorData.payload = [{ message: err.customErrorData.message }];
    }
    return res
      .status(err.customErrorData.code)
      .json(err.customErrorData);
  }

  return res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .json({
      message: 'Unknown error',
      payload: [{ message: 'Unknown error' }],
    });
};

export default errorHandler;
