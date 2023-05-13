const express = require("express");
const router = express.Router();

const { validateBody } = require("../utils/validateBody");

const {
  uploadCloud,
  userMiddlewares,
  // petsMiddlewares,
  // noticesMiddlewares,
} = require("../middlewares");

const { createNoticeSchema } = require("../utils/noticesValidationSchemas");

const {
  getAllNotices,
  getNoticesByTitle,
  getNoticesByCategory,
  getSingleNotice,
  createNotice,
  getPersonalNotices,
  deletePersonalNotice,
  addNoticeToFavorite,
  getFavoriteNotices,
  deleteFavoriteNotice,
} = require("../controllers/noticesControllers");

// Список усіх нотісів  СТВОРИТИ
router.route("/").get(getAllNotices);

// Список нотісів по ключовому слову ПЕРЕВІРИТИ
router.route("/title/title/search").get(getNoticesByTitle);

// Список нотісів по категоріям WORK
router.route("/:category").get(getNoticesByCategory);

// Отримання нотіса по id WORK
// petsMiddlewares.checkIsValidId,
router.route("/card/:id").get(getSingleNotice);

//  захищєні маршрути
router.use(userMiddlewares.protectRoute);

// Додавання нотіса юзером WORK
router.route("/").post(
  uploadCloud.single("photo"),
  // noticesMiddlewares.checkAddNotice
  validateBody(createNoticeSchema),
  createNotice
);

// Отримання списка нотісів, які створив юзер WORK
router.route("/user/own").get(getPersonalNotices);

// Видалення власного нотіса WORK
router.route("/:id").delete(
  // noticesMiddlewares.checkRemoveOwnNotice,
  deletePersonalNotice
);

// Додавання нотіса до улюблених NO WORK
// checkAddNoticeToFavorite
router.route("/:id/favorite").patch(addNoticeToFavorite);

// Отримання списка нотісів, які додані до улюблених NO WORK
router.get("/own/favorite", getFavoriteNotices);

// Видалення списка нотісів, які додані до улюблених NO WORK
router.route("/:id/favorite").delete(
  // noticesMiddlewares.checkDelNoticeFromFavorite,
  deleteFavoriteNotice
);

module.exports = { noticesRouter: router };
