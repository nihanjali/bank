"use strict";
const Joi = require("joi");

function validatePayBill(bill) {
  const schema = {
    user_id: Joi.number().required(),
    from_account_number: Joi.number().required(),
    bill_payee: Joi.string(),
    trans_amount: Joi.number().required()
  };

  return Joi.validate(bill, schema);
}

exports.validatePayBill = validatePayBill;