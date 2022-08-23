import * as yup from 'yup';

const ratingSchema = {
  body: {
    bookId: yup.string().required(),
    bookRating: yup.string().required(),
  },
};

export default ratingSchema;
