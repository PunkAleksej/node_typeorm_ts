import * as yup from 'yup';

const updateSchema = {
  body: {
    password: yup.string().min(8).max(32),
    firstName: yup.string().min(4).max(255),
    lastName: yup.string().min(8).max(255),
    email: yup.string().email(),
    photo: yup.string(),
  },
};

export default updateSchema;
