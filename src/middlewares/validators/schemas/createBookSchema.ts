import * as yup from 'yup';

const createBookSchema = {
  body: {
    name: yup.string().min(8).max(32).required(),
    description: yup.string().min(8).max(3000).required(),
  },
};

export default createBookSchema;
