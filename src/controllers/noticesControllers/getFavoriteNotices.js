const Notice = require("../../models/noticeModel");
// const User = require("../../models/userModel");
const { catchAsync } = require("../../utils");
const { HttpError } = require("../../middlewares");

// створити ендпоінт для отримання оголошень авторизованого користувача доданих ним же в обрані

let getFavoriteNotices = async (req, res, next) => {
  const { _id: userId } = req.user;
  const { page, limit } = req.query;

  const skip = (page - 1) * limit;

  const notices = await Notice.find(
    {
      favorite: { $in: userId },
    },
    "-createdAt -updatedAt",
    {
      skip,
      limit,
    }
  )
    .sort({
      createdAt: -1,
    })
    .populate("owner", "email phone");

  const total = await Notice.find({
    favorite: { $in: userId },
  }).count();

  res.status(200).json({
    message: "Your favorite notices",
    total,
    page,
    per_page: limit,
    notices,
  });
};

getFavoriteNotices = catchAsync(getFavoriteNotices);

module.exports = { getFavoriteNotices };

// === 2 варіант через метод populate та select
//  не працює: видає айдішник юзера

// const { _id: userId } = req.user;
// console.log("req.query--->", req.query);
// const { page = 1, limit = 20, key = "" } = req.query;
// const skip = (page - 1) * limit;

// const result = await User.findById(userId)
//   .populate("favorite", {
//     skip,
//     limit: Number(limit),
//   })
//   .select("favorite");
