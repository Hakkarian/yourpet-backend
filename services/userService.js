const { User } = require("../models");
// const { signToken } = require("../utils");
const jwt = require("jsonwebtoken");

exports.register = async (body) => {
  try {
    const user = await User.create({ ...body });

    return user;
  } catch (error) {
    console.log(error);
  }
};

exports.login = async (body) => {
  try {
    const { email } = body;
    const user = await User.findOne({ email });
    console.log('user', user)

    const payload = {
      id: user._id
    }

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '30d',
    });

    user.token = token;

    await user.save();

    return user;
  } catch (error) {
    console.log(error);
  }
};

exports.logout = async (currentUser) => {
  try {
    const user = currentUser;

    user.token = null;
    await user.save();
  } catch (error) {
    console.log(error);
  }
};

exports.current = async (currentUser) => {
  try {
    const user = currentUser;

    return user;
  } catch (error) {
    console.log(error);
  }
};

exports.updateUserInfo = async (id, body) => {
  try {
    const user = await User.findByIdAndUpdate(id, body, { new: true }).select(
      "-password -__v"
    );

    return user;
  } catch (error) {
    console.log(error);
  }
};
