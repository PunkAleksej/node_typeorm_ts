import * as yup from 'yup';
import createCustomError from '../../utils/createCustomError';
import { createValidateError } from '../../utils/createValidateError';

const validatorCreate = (schema) => async (request, response, next) => {
  try {
    await schema.validate({
      body: request.body,
      query: request.query,
      params: request.params,
    }, { abortEarly: false, strict: true });
    return next();
  } catch (err) {
    if (err instanceof yup.ValidationError) {
      const payload = createValidateError(err);
      next(createCustomError(400, 'asd', payload));
    }
    next(err);
  }
};

export default validatorCreate;
