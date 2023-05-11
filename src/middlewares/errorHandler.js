const errorHandler = (error, req, res, next) => {
  res.status(error.statusCode || 500).json({
    message: error.message || "Something went wrong, please try again later",
  });
};

module.exports = { errorHandler };
