import { NextFunction, Request } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';
import createCustomError from '../../utils/createCustomError';

type Value = {
  [key: string]: yup.StringSchema | yup.DateSchema;
};

type Schema = {
  body?: Value;
  params?: Value;
  query?: Value;
};

interface ValidationData {
  path: string;
  field: string;
  errorType: string;
  message: string;
}

const validatorCreate = (schema: Schema) => async (
  request: Request, response: never, next: NextFunction,
) => {
  try {
    const tempSchema = {};
    Object.entries(schema).forEach(([key, val]) => {
      (tempSchema[key] = yup.object(val));
    });
    const yupSchema = yup.object().shape(tempSchema).noUnknown(false);
    await yupSchema.validate({
      body: request.body,
      query: request.query,
      params: request.params,
    }, { abortEarly: false, strict: true });
    return next();
  } catch (err) {
    if (err instanceof yup.ValidationError) {
      const payload: ValidationData[] = err.inner.map((elem) => {
        const elemPath = elem.path.split('.');
        return {
          path: elemPath[0],
          field: elemPath[1],
          errorType: 'ValidationError',
          message: elem.errors[0].split('.')[1],
        };
      });
      next(createCustomError(StatusCodes.BAD_REQUEST, 'Validation Error', payload));
      return;
    }
    next(err);
  }
};

export default validatorCreate;
