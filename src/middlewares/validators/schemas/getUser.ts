import * as yup from 'yup';

const getUserSchema = {
  params: {
    id: yup.string().required(),
  },
};

export default getUserSchema;
