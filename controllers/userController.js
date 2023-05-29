const { catchAsync } = require("../utils");
const { userService } = require("../services");
const { OAuth2Client } = require('google-auth-library');
const { User } = require("../models");
const cloudinary = require("cloudinary").v2;

const googleClient = new OAuth2Client({
  clientId: process.env.GOOGLE_CLIENT_ID
})

exports.registerUser = catchAsync(async (req, res, next) => {
  const { email, _id: userId } = await userService.register(req.body);

  res.status(201).json({
    user: {
      email,
      userId,
    },
  });
});

exports.loginUser = catchAsync(async (req, res, next) => {
  const { email, _id: userId, token } = await userService.login(req.body);

  res.status(200).json({
    token,
    user: {
      email,
      userId,
    },
  });
});

exports.googleAuth = catchAsync(async (req, res) => {
  const { token } = req.body;
  const ticket = googleClient.verifyIdToken({
    idToken: token,
    audient: `${process.env.GOOGLE_CLIENT_ID}`
  })
  const payload = ticket.getPayload();
  console.log(payload)

  let user = await User.findOne({ email: payload?.email });
  if (!user) {
    user = new User({
      email: payload?.email,
    })
  }
  await user.save();

  res.json({user, token})
})


exports.logoutUser = catchAsync(async (req, res, next) => {
  await userService.logout(req.user);

  res.sendStatus(204);
});

exports.currentUser = catchAsync(async (req, res, next) => {
  const {
    name,
    email,
    phone,
    birthday,
    city,
    _id: userId,
    avatar,
    token,
  } = await userService.current(req.user);

  res.status(200).json({
    user: {
      name,
      email,
      phone,
      birthday,
      city,
      userId,
      avatar
    },
    token
  });
});

exports.updateUserInfo = catchAsync(async (req, res, next) => {
  const { _id: userId } = req.user;
  const { body } = req;

  if (req.file) {
    const { path } = req.file;

    const fileName = path.split("/");
    const length = fileName.length;

    body.avatar = cloudinary.url(fileName[length - 1], {
      width: 200,
      height: 200,
      gravity: "faces",
      crop: "fill",
      quality: "auto",
      fetch_format: "jpg",
    });
  }

  const user = await userService.updateUserInfo(userId, body);
  res.status(200).json({
    user
  });
});
