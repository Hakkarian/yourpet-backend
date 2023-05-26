const Joi = require("joi");

const { regExp } = require("../constants");

exports.registerValidator = (data) => {
  const schema = Joi.object({
    email: Joi.string()
      .email({
        tlds: { allow: false },
      })
      .required(),
    password: Joi.string().regex(regExp.PASSWD_REGEX).required(),
  });

  return schema.validate(data);
};

exports.loginValidator = (data) => {
  const schema = Joi.object({
    email: Joi.string()
      .email({
        tlds: { allow: false },
      })
      .required(),
    password: Joi.string().regex(regExp.PASSWD_REGEX).required(),
  });

  return schema.validate(data);
};

// exports.googleValidator = (data) => {
//   const schema = Joi.object({
//     email: Joi.string().email({ tids: { allow: true } }).required()
//   })

//   return schema.validate(data);
// }

exports.updateUserInfoValidator = (data) => {
  const schema = Joi.object({
    name: Joi.string().regex(regExp.NAME_REGEX).messages({
      "string.pattern.base": "Enter a valid name",
    }),
    email: Joi.string()
      .email({
        tlds: { allow: false },
      })
      .messages({
        "string.pattern.base": "Enter a valid email",
      }),
    phone: Joi.string().regex(regExp.PHONE_REGEX).allow(null, "").messages({
      "string.pattern.base":
        "Enter a valid phone number in a format '+380000000000'",
    }),
    city: Joi.string().allow(null, "").regex(regExp.LOCATION).messages({
      "string.pattern.base": "Enter a valid city name",
    }),
    birthday: Joi.string(),
    firstLogin: Joi.boolean(),
  });

  return schema.validate(data);
};
