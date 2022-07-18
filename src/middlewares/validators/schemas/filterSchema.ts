import * as yup from 'yup';

const filterSchema = {
  query: {
    column: yup.string(),
    order: yup.string(),
    perPage: yup.string(),
    page: yup.string(),
    minDoB: yup.date().test((DoB) => new Date(DoB).toString() !== 'Invalid Date'),
    maxDoB: yup.date().test((DoB) => new Date(DoB).toString() !== 'Invalid Date'),
    search: yup.string(),
  },
};

export default filterSchema;
