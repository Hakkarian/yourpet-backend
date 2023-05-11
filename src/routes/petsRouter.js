const express = require("express");
const petsRouter = express.Router();

const { userMiddlewares, petsMiddlewares } = require("../middlewares");
const { petsController } = require("../controllers");
const { petJoiSchema } = require("../models/petModel");

petsRouter.use(userMiddlewares.protectRoute);

petsRouter.route("/").get(petsController.getAllPets);

petsRouter
  .route("/")
  .post(
    [
      userMiddlewares.uploadCloud.single("photo"),
      petsMiddlewares.validation(petJoiSchema),
    ],
    petsController.addPet
  );

petsRouter
  .route("/:petId")
  .delete(petsMiddlewares.checkPetId, petsController.removePet);

module.exports = petsRouter;
