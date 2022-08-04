import * as yup from 'yup';

const signUpSchema = {
  body: {
    password: yup.string().min(8).max(32).required(),
    firstName: yup.string().min(4).max(255),
    lastName: yup.string().min(4).max(255),
    email: yup.string().email().required(),
    DoB: yup.string(),
  },
};

export default signUpSchema;
