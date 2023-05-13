const Notice = require("../../models/noticeModel");
const { catchAsync } = require("../../utils");
const { HttpError } = require("../../middlewares");

// видалення оголошення авторизованого користувача створеного цим же користувачем

let deletePersonalNotice = async (req, res, next) => {
  const { id } = req.params;
  const { _id } = req.user;

  const myNotices = await Notice.find({ owner: _id });

  if (!myNotices) {
    return next(HttpError(404));
  }

  const myNoticesId = myNotices.map(({ _id }) => _id.toString());

  if (!myNoticesId.includes(id)) {
    return next(HttpError(404));
  }

  await Notice.findByIdAndDelete(id);

  res.sendStatus(204);
};

deletePersonalNotice = catchAsync(deletePersonalNotice);

module.exports = { deletePersonalNotice };
