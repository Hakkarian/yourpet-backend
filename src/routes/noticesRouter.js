const express = require("express");
const router = express.Router();

// const { noticesControllers } = require("../../controllers");
// const { noticesMiddlewares, userMiddlewares } = require("../../middlewares");
const { validateBody } = require("../utils/validateBody");
const { uploadCloud } = require("../middlewares");
const {
  createNoticeSchema,
} = require("../utils/validation/noticesValidationSchemas");
const {
  getNotices,
  createNotice,
} = require("../controllers/noticesControllers");

router.get("/", getNotices);

router.post(
  "/",
  // uploadCloud.single("avatars"),
  validateBody(createNoticeSchema),
  createNotice
);

module.exports = { noticesRouter: router };
