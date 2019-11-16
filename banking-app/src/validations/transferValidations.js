"use strict";
const Joi = require("joi");

function validateTransfer(transfer) {
  const schema = {
    user_id: Joi.number().required(),
    from_account_number: Joi.number().required(),
    to_account_number: Joi.number().required(),
    trans_amount: Joi.number().required()
  };

  return Joi.validate(transfer, schema);
}

exports.validateTransfer = validateTransfer;