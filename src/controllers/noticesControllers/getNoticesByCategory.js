const Notice = require("../../models/noticeModel");
const { catchAsync } = require("../../utils");
const { HttpError } = require("../../middlewares");

// для отримання оголошень по категоріям

let getNoticesByCategory = async (req, res, next) => {
  const { category } = req.params;
  const { page = 1, limit = 12 } = req.query;
  const skip = (page - 1) * limit;

  const notices = await Notice.find({ category }, "-createdAt -updatedAt", {
    skip,
    limit,
  })
    .sort({ createdAt: -1 })
    .populate("owner", "email phone");

  const total = await Notice.find({ category }).count();

  res.status(200).json({ notices, page, per_page: limit, total });
};
getNoticesByCategory = catchAsync(getNoticesByCategory);

module.exports = { getNoticesByCategory };
