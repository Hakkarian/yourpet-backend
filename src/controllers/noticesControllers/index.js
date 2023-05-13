const { getAllNotices } = require("./getAllNotices");
const { getNoticesByTitle } = require("./getNoticesByTitle");
const { getNoticesByCategory } = require("./getNoticesByCategory");
const { getSingleNotice } = require("./getSingleNotice");
const { createNotice } = require("./createNotice");
const { getPersonalNotices } = require("./getPersonalNotices");
const { deletePersonalNotice } = require("./deletePersonalNotice");
const { addNoticeToFavorite } = require("./addNoticeToFavorite");
const { getFavoriteNotices } = require("./getFavoriteNotices");
const { deleteFavoriteNotice } = require("./deleteFavoriteNotice");

module.exports = {
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
};
