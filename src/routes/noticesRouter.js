const express = require("express");
const router = express.Router();

const { validateBody } = require("../utils/validateBody");
const { uploadCloud, userMiddlewares } = require("../middlewares");

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
  userMiddlewares.protectRoute,
  uploadCloud.single("photo"),
  validateBody(createNoticeSchema),
  createNotice
);

module.exports = { noticesRouter: router };
