const Notice = require("../../models/noticeModel");
const { catchAsync } = require("../../utils");
const { HttpError } = require("../../middlewares");

// отримання всіх оголошень
// get("/")
let getNotices = async (req, res, next) => {
  const notices = await Notice.find();
  res.status(200).json(notices);
};

getNotices = catchAsync(getNotices);

module.exports = { getNotices };
