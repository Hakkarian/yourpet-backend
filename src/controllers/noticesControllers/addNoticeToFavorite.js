const Notice = require("../../models/noticeModel");
// const User = require("../../models/userModel");
const { catchAsync } = require("../../utils");
const { HttpError } = require("../../middlewares");

// створити ендпоінт для додавання оголошення до обраних
// router.post("/favorite/:id", userMiddlewares.protectRoute, addNoticeToFavorite);

let addNoticeToFavorite = async (req, res, next) => {
  const { _id: userId } = req.user;

  const { id } = req.params;

  const { favorite } = await Notice.findOne({ _id: id });

  if (favorite.includes(userId)) {
    throw HttpError(500, "Notice already added to favorites");
  }

  const notice = await Notice.findOneAndUpdate(
    { _id: id },
    { $push: { favorite: userId } }
  );

  res.status(200).json({
    userId: userId,
    noticeId: notice._id,
    message: "success",
  });
};

addNoticeToFavorite = catchAsync(addNoticeToFavorite);

module.exports = { addNoticeToFavorite };

// === 2 варіант додавання колекціі обраних через метод populate модель User  ===
// не працює, в постмені створюється. а в базі тільки масив з ійдішників

// const user = await User.findById(userId);
// if (!user) {
//   throw HttpError(404, "Not found such user");
// }

// const result = await User.findByIdAndUpdate(
//   userId,
//   { $push: { favorite: id } },
//   { new: true }
// ).populate("favorite");

// res.status(200).json({
//   message: "Notice was added to favorite",
//   status: "success",
//   code: 200,
//   data: { result },
// });
