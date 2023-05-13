const Notice = require("../../models/noticeModel");
const { catchAsync } = require("../../utils");
const { HttpError } = require("../../middlewares");

// ендпоінт для отримання одного оголошення
// router.get("/card/:id", getSingleNotice);
let getSingleNotice = async (req, res, next) => {
  const { id } = req.params;

  const noticesFilter = {
    _id: id,
  };
  const fullNotice = await Notice.findById(noticesFilter, {
    title: 1,
    breed: 1,
    comments: 1,
    avatarURL: 1,
    category: 1,
    birthdate: 1,
    sex: 1,
    name: 1,
    price: 1,
    favorite: 1,
    _id: 1,
    owner: 1,
    location: 1,
  }).populate("owner", " email phone");
  console.log(fullNotice);
  if (!fullNotice) {
    throw HttpError(404, "Not found");
  }

  const result = await Notice.findById(id);
  if (!result) {
    throw HttpError(404, "Not Faund");
  }
  res.status(200).json({ message: "Successfully", fullNotice });
};
getSingleNotice = catchAsync(getSingleNotice);

module.exports = { getSingleNotice };
