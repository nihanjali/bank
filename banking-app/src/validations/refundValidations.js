"use strict";
const Joi = require("joi");

function validateRefund(refund) {
  const schema = {
    user_id: Joi.number().required(),
    from_account_number: Joi.number().required(),
    trans_amount: Joi.number().required()
  };

  return Joi.validate(refund, schema);
}

exports.validateRefund = validateRefund;