import * as yup from 'yup';

const deleteSchema = {
  params: {
    id: yup.string().required(),
  },
};

export default deleteSchema;
