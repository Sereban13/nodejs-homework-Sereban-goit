const Joi = require("joi");

// const emailRegex = /^\[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
// const subList = ["starter", "pro", "business"];
const emailRegExp = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

const registerSchema = Joi.object({
  email: Joi.string().pattern(emailRegExp).required(),
  password: Joi.string().min(6).required(),
  //   subscription: Joi.string().validate(subList),
});

const loginSchema = Joi.object({
  email: Joi.string().pattern(emailRegExp).required(),
  password: Joi.string().min(6).required(),
});

const schemas = {
  registerSchema,
  loginSchema,
};

module.exports = schemas;
