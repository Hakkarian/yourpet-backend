const { Types } = require("mongoose");
const { AppError, catchAsync } = require("../utils");
const { Pet } = require("../models/petModel");

exports.validation = (schema) => {
  return (req, _, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return next(new AppError(400, error.message));
    }
    next();
  };
};

exports.checkPetId = catchAsync(async (req, res, next) => {
  const { petId: contactId } = req.params;
  const { _id: userId } = req.user;

  const idIsValid = Types.ObjectId.isValid(contactId);

  if (!idIsValid) {
    return next(new AppError(404, "Not found"));
  }

  const petExists = await Pet.exists({ _id: contactId, owner: userId });

  if (!petExists) {
    return next(new AppError(404, "Not found!!!"));
  }

  next();
});
