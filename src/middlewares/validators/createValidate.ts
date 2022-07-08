const validatorCreate = (schema) => async (request, response, next) => {
  try {
    await schema.validate({
      body: request.body,
      query: request.query,
      params: request.params,
    });
    return next();
  } catch (err) {
    next(err);
  }
};

export default validatorCreate;
