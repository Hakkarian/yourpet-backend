const userMiddlewares = require("./userMiddlewares");
const noticesMiddlewares = require("./noticesMiddlewares");
const petsMiddlewares = require("./petsMiddlewares");
const { uploadCloud } = require("./uploadCloud");
const { errorHandler } = require("./errorHandler");
const { notFoundHandlerError } = require("./notFoundHandlerError");
const { HttpError } = require("./HttpError");
const { authenticate } = require("./authenticate.js");

module.exports = {
  userMiddlewares,
  noticesMiddlewares,
  petsMiddlewares,
  uploadCloud,
  errorHandler,
  notFoundHandlerError,
  HttpError,
  authenticate,
};
