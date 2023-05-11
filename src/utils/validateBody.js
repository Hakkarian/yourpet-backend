const { AppError } = require("./index");

const validateBody = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      next(new AppError(422, `${error}`));
      return;
    }
    next();
  };
};

module.exports = { validateBody };
