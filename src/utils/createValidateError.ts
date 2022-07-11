import * as yup from 'yup';

interface ValidationData {
  path: string;
  field: string;
  errorType: string;
  message: string;
}

export const createValidateError = (err: yup.ValidationError) => {
  const validateError: ValidationData[] = [];
  err.inner.forEach((element) => {
    validateError.push({
      path: element.path.split('.')[0],
      field: element.path.split('.')[1],
      errorType: 'ValidationError',
      message: element.errors[0].split('.')[1],
    });
  });
  return validateError;
};
