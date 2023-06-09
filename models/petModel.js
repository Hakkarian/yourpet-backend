const Joi = require("joi");
const { Schema, model } = require("mongoose");
const { regExp } = require("../constants");

const petSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  birthday: {
    type: String,
    required: [true, "Date of birth is required"],
  },
  breed: {
    type: String,
    required: [true, "Breed is required"],
  },
  photo: {
    type: String,
    required: [true, "Photo is required"],
    default: null,
  },
  comments: {
    type: String,
    minlength: 8,
    maxlength: 120,
    default: null,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
});

const petJoiSchema = Joi.object({
  name: Joi.string().min(2).max(16).regex(regExp.NAME_REGEX).required(),
  birthday: Joi.string().required(),
  breed: Joi.string().min(2).max(16).regex(regExp.BREED_REGEX).required(),
  comments: Joi.string().min(8).max(120),
});

const Pet = model("pet", petSchema);

module.exports = {
  Pet,
  petJoiSchema,
};
