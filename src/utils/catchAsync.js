// const catchAsync = (fn) => (req, res, next) => {
//   fn(req, res, next).catch((err) => next(err));
// };

const catchAsync = (func) => {
  return async (req, res, next) => {
    try {
      return await func(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};

module.exports = catchAsync;
