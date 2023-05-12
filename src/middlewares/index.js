const userMiddlewares = require("./userMiddlewares");
const noticesMiddlewares = require("./noticesMiddlewares");
// const petsMiddlewares = require("./petsMiddlewares");
const { uploadCloud } = require("./uploadCloud");
const { errorHandler } = require("./errorHandler");
const { notFoundHandlerError } = require("./notFoundHandlerError");
const { authenticate } = require('./authenticate.js');

module.exports = {
  userMiddlewares,
  uploadCloud,
  errorHandler,
  notFoundHandlerError,
  authenticate
};
