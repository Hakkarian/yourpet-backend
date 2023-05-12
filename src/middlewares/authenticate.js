const jwt = require("jsonwebtoken");

const { User } = require("../models/userModel");

const { HttpError } = require("../middlewares/HttpError");

const { JWT_SECRET } = process.env;

const authenticate = async (req, res, next) => {
  const { authorization = "" } = req.headers;

  const [bearer, token] = authorization.split(" ");

  if (bearer !== "Bearer") {
    console.log("перевірка bearer");
    next(HttpError(401));
  }

  try {
    const { id } = jwt.verify(token, JWT_SECRET);
    console.log("id--->", id);
    console.log("token--->", token);
    const user = await User.findById(id);
    console.log("user--->", user);
    if (!user || !token) {
      console.log(
        "перевірка чи є user або token--->",
        "user:",
        user,
        "user.token:",
        token
      );
      next(HttpError(401));
    }
    req.user = user;
    console.log("коли є user--->", user);
    next();
  } catch {
    console.log("catch - не пройшов перевірку user", req.user);
    next(HttpError(401));
  }
};

module.exports = { authenticate };
