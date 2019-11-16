"use strict";
const Joi = require("joi");

function validateUser(user) {
  const schema = {
    name: Joi.string().required(),
    email_id: Joi.string().email().required(),
    password: Joi.string().required(),
    user_type: Joi.string()
  };

  return Joi.validate(user, schema);
}

exports.validateUser = validateUser;