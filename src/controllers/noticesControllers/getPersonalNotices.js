const Notice = require("../../models/noticeModel");
const { catchAsync } = require("../../utils");

// отримання оголошень авторизованого кристувача створених цим же користувачем
// router.get("/personal", userMiddlewares.protectRoute, getPersonalNotices);
let getPersonalNotices = async (req, res, next) => {
  const { _id } = req.user;

  const noticesOwner = {
    [`owner`]: _id,
  };
  console.log(noticesOwner);
  const { page = 1, limit = 6, key = "" } = req.query;
  const skip = (page - 1) * limit;

  const notices = await Notice.find(noticesOwner, "", {
    skip,
    limit: Number(limit),
  }).populate("owner", "_id");

  res.status(200).json({
    message: "Your personal notices",
    total: notices.length,
    notices,
  });
};

getPersonalNotices = catchAsync(getPersonalNotices);

module.exports = { getPersonalNotices };
