"use strict";
const Joi = require("joi");

function validateLogin(login) {
  const schema = {
    email_id: Joi.string().email().required(),
    password: Joi.string().required()
  };

  return Joi.validate(login, schema);
}

exports.validateLogin = validateLogin;