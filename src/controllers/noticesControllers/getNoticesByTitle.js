const Notice = require("../../models/noticeModel");
const { catchAsync } = require("../../utils");

// ендпоінт для пошуку оголошеннь по заголовку
// router.get("/search",  getNoticesByTitle;
let getNoticesByTitle = async (req, res, next) => {
  const { search } = req.query;

  const { page, limit } = req.query;

  const skip = (page - 1) * limit;

  const notices = await Notice.find(
    { title: { $regex: new RegExp(search, "i") } },
    "-createdAt -updatedAt",
    {
      skip,
      limit,
    }
  )
    .sort({ createdAt: -1 })
    .populate("owner", "email phone");

  res
    .status(200)
    .json({ notices, page, per_page: limit, total: notices.length });
};

getNoticesByTitle = catchAsync(getNoticesByTitle);

module.exports = { getNoticesByTitle };
