const userController = require("./userController");
const petsController = require("./petsController");
const { getNotices, createNotice } = require("./noticesController");

module.exports = {
  userController,
  petsController,
  getNotices,
  createNotice,
};
