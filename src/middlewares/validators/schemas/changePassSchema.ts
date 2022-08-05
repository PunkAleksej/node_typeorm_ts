import * as yup from 'yup';

const changePassSchema = {
  body: {
    newPassword: yup.string().min(8).max(32).required(),
    oldPassword: yup.string().min(8).max(32).required(),
  },
};

export default changePassSchema;
