import * as yup from 'yup';

const signUpSchema = yup.object({
  body: yup.object({
    password: yup.string().min(8).max(32).required(),
    firstName: yup.string().min(4).max(255).required(),
    lastName: yup.string().min(8).max(255).required(),
    email: yup.string().email().required(),
  }),
});

export default signUpSchema;
