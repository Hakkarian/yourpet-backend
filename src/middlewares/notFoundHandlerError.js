const notFoundHandlerError = (req, res, next) => {
  res.status(404).json({
    message: "This route does not exist. Please check the documentation",
  });
};

module.exports = { notFoundHandlerError };
