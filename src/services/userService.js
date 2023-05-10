const User = require("../models/userModel");
const { signToken } = require("../utils");

exports.register = async (body) => {
  const newUser = await User.create({ ...body });

  return newUser;
};

exports.login = async (body) => {
  const { email } = body;
  const user = await User.findOne({ email });

  const token = signToken(user._id);

  user.token = token;
  await user.save();

  return user;
};

exports.logout = async (currentUser) => {
  const user = currentUser;

  user.token = null;
  await user.save();
};

exports.current = async (currentUser) => {
  const user = currentUser;

  return user;
};

exports.updateUserInfo = async (id, body) => {
  const user = await User.findByIdAndUpdate(id, body, { new: true }).select(
    "-password -token -__v"
  );

  return user;
};
