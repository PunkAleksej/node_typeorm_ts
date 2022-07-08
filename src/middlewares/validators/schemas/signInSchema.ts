import * as yup from 'yup';

const signInSchema = yup.object({
  body: yup.object({
    password: yup.string().min(8).max(32).required(),
    email: yup.string().email().required(),
  }),
});

export default signInSchema;
