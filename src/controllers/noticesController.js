const { noticesService } = require("../services");
const { catchAsync } = require("../utils");

let getNotices = async (req, res, next) => {
  const notices = await noticesService.getAllNoticesService();
  res.status(200).json(notices);
};

getNotices = catchAsync(getNotices);

let createNotice = async (req, res, next) => {
  const createdNotice = await noticesService.createNoticesService(req.body);
  console.log(createdNotice);
  console.log(req.params);
  console.log(req.query);
  console.log(req.body);
  res.status(200).json(createdNotice);
};
createNotice = catchAsync(createNotice);

module.exports = { getNotices, createNotice };
