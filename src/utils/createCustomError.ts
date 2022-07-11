export interface ExtendedError<P> extends Error {
  customErrorData?: {
    code: number;
    message: string;
    payload: P;
  },
}

const createCustomError = <P>(
  code: number,
  message: string,
  payload: P = null,
): ExtendedError<P> => {
  const error = new Error(message) as ExtendedError<P>;

  error.customErrorData = {
    message,
    code,
    payload,
  };

  return error;
};

export default createCustomError;
