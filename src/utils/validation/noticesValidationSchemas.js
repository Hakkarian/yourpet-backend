const Joi = require("joi");

const { regExp } = require("../../constants");

const location = regExp.LOCATION;
const birthday = regExp.BIRTHDAY_REG_EXP;

const createNoticeSchema = Joi.object({
  category: Joi.string()
    .valid("my-pet", "sell", "lost-found", "for-free")
    .required(),
  title: Joi.string().required(),
  name: Joi.string().required(),
  birthday: Joi.string().pattern(birthday).required(),
  breed: Joi.string().required(),
  sex: Joi.string().valid("female", "male").required(),
  location: Joi.string().pattern(location).required(),
  price: Joi.number(),
  comment: Joi.string().required(),
  photo: Joi.string(),
  favorite: Joi.boolean(),
});

// const updateTaskValidationSchema = Joi.object()
//   .keys({
//     title: createTaskSchema.extract("title").optional(),
//     completed: createTaskSchema.extract("completed").optional(),
//   })
//   .or("title", "completed");

module.exports = { createNoticeSchema };
