import * as yup from 'yup';

const authSchema = yup.object({
  headers: yup.object({
    authorization: yup.string().required(),
  }),
});

export default authSchema;
