const cloudinary = require("cloudinary").v2;

const Notice = require("../models/noticeModel");
const { catchAsync } = require("../utils");

let getNotices = async (req, res, next) => {
  const notices = await Notice.find();
  res.status(200).json(notices);
};

getNotices = catchAsync(getNotices);

let createNotice = async (req, res, next) => {
  console.log("req.user---->", req.user);

  const owner = req.user.id;
  const noticeBody = req.body;
  const fileName = req.file.path.split("/");
  const length = fileName.length;

  noticeBody.photo = cloudinary.url(fileName[length - 1], {
    width: 300,
    height: 300,
    gravity: "faces",
    crop: "fill",
    quality: "auto",
    fetch_format: "jpg",
  });

  const data = !!req.file
    ? { photo: req.file.path, owner, ...noticeBody }
    : { owner, ...noticeBody };

  const createdNotice = await Notice.create(data);
  res.status(200).json(createdNotice);
};
createNotice = catchAsync(createNotice);

module.exports = { getNotices, createNotice };
