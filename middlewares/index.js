const userMiddlewares = require("./userMiddlewares");
const noticesMiddlewares = require("./noticesMiddlewares");
const petsMiddlewares = require("./petsMiddlewares");
const googlePassport = require('./googlePassport');

module.exports = {
  userMiddlewares,
  petsMiddlewares,
  noticesMiddlewares,
  googlePassport
};
