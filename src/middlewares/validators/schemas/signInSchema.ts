import * as yup from 'yup';

const signInSchema = {
  body: {
    password: yup.string().min(8).max(32).required(),
    email: yup.string().email().required(),
  },
};

export default signInSchema;
