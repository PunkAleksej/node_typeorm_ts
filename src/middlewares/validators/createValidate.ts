import { NextFunction, Request } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';
import createCustomError from '../../utils/createCustomError';

interface ValidationData {
  path: string;
  field: string;
  errorType: string;
  message: string;
}

const validatorCreate = (schema) => async (
  request: Request, response, next: NextFunction,
) => {
  try {
    await schema.validate({
      body: request.body,
      query: request.query,
      params: request.params,
    }, { abortEarly: false, strict: true });
    return next();
  } catch (err) {
    if (err instanceof yup.ValidationError) {
      const payload: ValidationData[] = err.inner.map((elem) => {
        return {
          path: elem.path.split('.')[0],
          field: elem.path.split('.')[1],
          errorType: 'ValidationError',
          message: elem.errors[0].split('.')[1],
        };
      });
      // err.inner.forEach((element) => {
      //   payload.push({
      //     path: element.path.split('.')[0],
      //     field: element.path.split('.')[1],
      //     errorType: 'ValidationError',
      //     message: element.errors[0].split('.')[1],
      //   });
      // });
      next(createCustomError(StatusCodes.BAD_REQUEST, 'Validation Error', payload));
    }
    next(err);
  }
};

export default validatorCreate;
