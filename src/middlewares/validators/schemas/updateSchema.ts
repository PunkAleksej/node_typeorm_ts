import { object, string } from 'yup';

const signUpSchema = object({
  body: object({
    password: string().min(8).max(32).required(),
    firstName: string().min(4).max(255).required(),
    lastName: string().min(8).max(255).required(),
    email: string().email().required(),
  }),
});

export default signUpSchema;
