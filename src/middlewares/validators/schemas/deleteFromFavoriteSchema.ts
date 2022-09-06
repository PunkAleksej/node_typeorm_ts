import * as yup from 'yup';

const deleteFromFavoriteSchema = {
  body: {
    id: yup.string().required(),
  },
};

export default deleteFromFavoriteSchema;
