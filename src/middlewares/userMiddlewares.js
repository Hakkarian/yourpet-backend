const jwt = require("jsonwebtoken");
const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");

const User = require("../models/userModel");
const { AppError, catchAsync, userValidator } = require("../utils");

exports.checkUserRegister = catchAsync(async (req, res, next) => {
  const { error, value } = userValidator.registerValidator(req.body);

  if (error) {
    return next(new AppError(400, error.details[0].message));
  }

  const userExists = await User.exists({ email: value.email });

  if (userExists) return next(new AppError(409, "Email in use"));

  req.body = value;

  next();
});

exports.checkUserLogin = catchAsync(async (req, res, next) => {
  const { error, value } = userValidator.loginValidator(req.body);

  const user = await User.findOne({
    email: value.email,
  });

  if (error) {
    return next(new AppError(400, error.details[0].message));
  }

  if (!user) {
    return next(new AppError(401, "Email or password is wrong"));
  }

  const correctPassword = await user.checkPassword(
    value.password,
    user.password
  );

  if (!correctPassword) {
    return next(new AppError(401, "Email or password is wrong"));
  }

  req.body = value;

  next();
});

exports.protectRoute = catchAsync(async (req, res, next) => {
  const token =
    req.headers.authorization?.startsWith("Bearer") &&
    req.headers.authorization.split(" ")[1];

  if (!token) return next(new AppError(401, "Not authorized"));

  let decodedToken;

  try {
    decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    console.log(err.message);

    return next(new AppError(401, "Not authorized"));
  }

  const currentUser = await User.findOne({ _id: decodedToken.id, token });

  if (!currentUser) return next(new AppError(401, "Not authorized"));

  req.user = currentUser;

  next();
});

exports.checkCurrentUser = catchAsync(async (req, res, next) => {
  const token =
    req.headers.authorization?.startsWith("Bearer") &&
    req.headers.authorization.split(" ")[1];

  if (!token) return next(new AppError(401, "Not authorized"));

  const currentUser = await User.findOne({ token });

  if (!currentUser) return next(new AppError(401, "Not authorized"));

  req.user = currentUser;

  next();
});

exports.checkUserLogout = catchAsync(async (req, res, next) => {
  const token =
    req.headers.authorization?.startsWith("Bearer") &&
    req.headers.authorization.split(" ")[1];

  if (!token) return next(new AppError(401, "Not authorized"));

  let decodedToken;

  try {
    decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    console.log(err.message);

    return next(new AppError(401, "Not authorized"));
  }

  const currentUser = await User.findOne({ _id: decodedToken.id, token });

  if (!currentUser) return next(new AppError(401, "Not authorized"));

  req.user = currentUser;

  next();
});

exports.checkUserInfo = catchAsync(async (req, res, next) => {
  const { error, value } = userValidator.updateUserInfoValidator(req.body);

  if (error) {
    return next(new AppError(400, error.details[0].message));
  }

  const userExists = await User.exists({ email: value.email });

  if (userExists) return next(new AppError(409, "Email in use"));

  req.body = value;

  next();
});

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  folder: "avatars",
  allowedFormats: ["jpg", "png", "gif", "jpeg"],
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  file.mimetype.startsWith("image")
    ? cb(null, true)
    : cb(new AppError(400, "Downloaded file must be image type"), false);
};

exports.uploadCloud = multer({
  storage,
  fileFilter,
  limits: { fileSize: 3 * 1024 * 1024 },
});
