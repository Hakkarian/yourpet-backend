const { catchAsync } = require("../../utils");

let getAllNotices = (req, res, next) => {};

getAllNotices = catchAsync(getAllNotices);

module.exports = { getAllNotices };
