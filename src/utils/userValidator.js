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

exports.updateUserInfoValidator = (data) => {
  const schema = Joi.object({
    name: Joi.string(),
    email: Joi.string().email({
      tlds: { allow: false },
    }),
    phone: Joi.string().regex(regExp.PHONE_REGEX).allow(null, ""),
    city: Joi.string().allow(null, ""),
    birthday: Joi.date().min("1914-01-01").max(Date.now()).iso(),
  });

  return schema.validate(data);
};
