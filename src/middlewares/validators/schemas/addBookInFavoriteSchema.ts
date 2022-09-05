import * as yup from 'yup';

const addBookInFavoriteSchema = {
  body: {
    bookId: yup.string().required(),
  },
};

export default addBookInFavoriteSchema;
