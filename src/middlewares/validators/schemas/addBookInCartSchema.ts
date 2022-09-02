import * as yup from 'yup';

const addBookInCartSchema = {
  body: {
    bookId: yup.string().required(),
    booksQuantity: yup.string().required(),
  },
};

export default addBookInCartSchema;
