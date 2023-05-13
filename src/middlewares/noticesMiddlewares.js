// const { Types } = require("mongoose");
// const { AppError, catchAsync } = require("../utils");
// const { Notice } = require("../models/noticeModel");

// const checkAddNotice = (req, res, next) => {
//   const { error, value } = noticesValidator.addNoticeValidator(req.body);

//   if (error) {
//     return next(
//       new AppError(
//         400,
//         error.details.map((item) => {
//           return `${item.message}`;
//         })
//       )
//     );
//   }

//   req.body = value;

//   next();
// };

// const checkRemoveOwnNotice = () => {};

// const checkAddNoticeToFavorite = async (req, res, next) => {
//   const { _id: userId } = req.user;
//   const { id } = req.params;

//   const { favorite } = await Notice.findOne({ _id: id });

//   if (favorite.includes(userId)) {
//     return next(new AppError(409, "Notice already added to favorites"));
//   }

//   next();
// };

// const checkDelNoticeFromFavorite = () => {};

// module.exports = { checkAddNoticeToFavorite };
