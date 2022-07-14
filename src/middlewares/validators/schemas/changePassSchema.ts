import * as yup from 'yup';

const changePassSchema = {
  body: {
    password: yup.string().min(8).max(32).required(),
  },
};

export default changePassSchema;
