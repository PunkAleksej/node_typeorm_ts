import * as yup from 'yup';

const signInSchema = {
  body: {
    email: yup.string().required(),
    password: yup.string().min(8).max(32).required(),
  },
};

export default signInSchema;
