const cloudinary = require("cloudinary").v2;

const Notice = require("../../models/noticeModel");
const { catchAsync } = require("../../utils");

// створити ендпоінт для додавання оголошень відповідно до обраної категорії
// post("/")
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
  console.log("req.file---->", req.file.path);
  const data = !req.file
    ? {
        ...noticeBody,
        photo: req.file.path,
        price: Number(req.body.price),
        owner,
      }
    : { ...noticeBody, owner };

  const createdNotice = await Notice.create(data);
  console.log("createdNotice---->", createdNotice);
  res.status(200).json(createdNotice);
};
createNotice = catchAsync(createNotice);

module.exports = { createNotice };
