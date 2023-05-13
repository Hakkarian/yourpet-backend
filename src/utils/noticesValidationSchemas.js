const Joi = require("joi");

const { regExp } = require("../constants");

const location = regExp.LOCATION;

const createNoticeSchema = Joi.object({
  category: Joi.string().valid("sell", "lost-found", "for-free").required(),
  title: Joi.string().min(2).max(48).required().messages({
    "any.required": "Fill  in the field",
    "string.empty": "Title cannot be an empty field",
  }),
  name: Joi.string().min(2).max(16).required().messages({
    "any.required": "Fill  in the field",
    "string.empty": "Name cannot be an empty field",
  }),
  birthday: Joi.date().required(),
  breed: Joi.string().min(2).max(16).required().messages({
    "any.required": "Fill  in the field",
    "string.empty": "Breed cannot be an empty field",
  }),
  sex: Joi.string().valid("female", "male").required().messages({
    "any.required": "Fill  in the field",
    "string.empty": "Sex cannot be an empty field",
  }),
  location: Joi.string().pattern(location).required().messages({
    "any.required": "Fill  in the field",
    "string.empty": "Location cannot be an empty field",
  }),
  price: Joi.number(),
  comments: Joi.string().required(),
  favorite: Joi.array(),
  photo: Joi.string(),
});

module.exports = { createNoticeSchema };
