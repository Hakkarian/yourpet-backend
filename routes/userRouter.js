const express = require("express");
const userRouter = express.Router();

const { userMiddlewares } = require("../middlewares");
const { userController } = require("../controllers");
const { uploadCloud } = require("../helpers");
const { googlePassport } = require('../middlewares');

userRouter
  .route("/auth/register")
  .post(userMiddlewares.checkUserRegister, userController.registerUser);

userRouter
  .route("/auth/login")
  .post(userMiddlewares.checkUserLogin, userController.loginUser);

userRouter
  .route('/auth/google')
  .get(googlePassport.authenticate('google', { scope: ['email', 'profile'] }));
  
userRouter
  .route('/google/callback')
  .get(googlePassport.authenticate('google', {session: false}), userController.googleAuth)

userRouter
  .route("/user/logout")
  .post(userMiddlewares.checkUserLogout, userController.logoutUser);

userRouter
  .route("/user/current")
  .get(userMiddlewares.checkCurrentUser, userController.currentUser);

userRouter
  .route("/user/info")
  .patch(
    [
      userMiddlewares.checkCurrentUser,
      userMiddlewares.checkUserInfo,
      uploadCloud.single("avatar"),
    ],
    userController.updateUserInfo
  );

module.exports = userRouter;
