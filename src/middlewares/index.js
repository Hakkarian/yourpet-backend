const userMiddlewares = require("./userMiddlewares");
// const petsMiddlewares = require("./petsMiddlewares");
const { uploadCloud } = require("./uploadCloud");
const { errorHandler } = require("./errorHandler");
const { notFoundHandlerError } = require("./notFoundHandlerError");

module.exports = {
  userMiddlewares,
  uploadCloud,
  errorHandler,
  notFoundHandlerError
};
