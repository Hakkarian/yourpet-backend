const Notice = require("../../models/noticeModel");
const { catchAsync } = require("../../utils");
const { HttpError } = require("../../middlewares");

// видалення оголошення авторизованого користувача доданих цим же до обраних

// let deleteFavoriteNotice = async (req, res, next) => {
//   const { _id: userId } = req.user;
//   const { id } = req.params;
//   const deletedNotice = await Notice.findOne({
//     _id: id,
//     favorite: userId,
//   });

//   if (!deletedNotice) {
//     throw HttpError(404, "Notice is not found in favorite");
//   }

//   const { favorite } = deletedNotice;
//   const indexOfRemovedNotice = favorite.indexOf(userId);
//   favorite.splice(indexOfRemovedNotice, 1);

//   await Notice.findOneAndUpdate({ _id: id }, { favorite });

//   res.status(200).json({
//     message: "Notice was deleted from favorite",
//   });
// };

let deleteFavoriteNotice = async (req, res, next) => {
  console.log("req.user--->", req.user);
  const { _id: userId } = req.user;
  const { id } = req.params;

  await Notice.findOneAndUpdate(
    { _id: id },
    { $pull: { favorite: userId } },
    {
      new: true,
    }
  );

  res.status(200).json({ message: "Notices was deleted from favorites" });
};

deleteFavoriteNotice = catchAsync(deleteFavoriteNotice);

module.exports = { deleteFavoriteNotice };
