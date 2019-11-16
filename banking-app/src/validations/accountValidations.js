"use strict";
const Joi = require("joi");

function validateAccount(account) {
  const schema = {
    user_id: Joi.number().required(),
    account_type: Joi.string().required(),
    account_balance: Joi.number()
  };

  return Joi.validate(account, schema);
}

function validateAccountClose(account) {
  const schema = {
    user_id: Joi.number().required(),
    account_number: Joi.number().required()
  };

  return Joi.validate(account, schema);
}

exports.validateAccount = validateAccount;
exports.validateAccountClose = validateAccountClose;