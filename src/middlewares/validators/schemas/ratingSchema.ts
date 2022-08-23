import * as yup from 'yup';

const ratingSchema = {
  body: {
    userId: yup.number().required(),
    bookId: yup.number().required(),
    bookRating: yup.number().required(),
  },
};

export default ratingSchema;
