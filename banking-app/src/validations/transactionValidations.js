"use strict";
const Joi = require("joi");

const validateGetTransactions = (transfer) => {
  const schema = {
    user_id: Joi.number().required(),
    account_number: Joi.number().required()
  };

  return Joi.validate(transfer, schema);
}

function validateGetTransactionsByType(transfer) {
  const schema = {
    user_id: Joi.number().required(),
    trans_type: Joi.string().required(),
    account_number: Joi.string().required()
  };

  return Joi.validate(transfer, schema);
}

exports.validateGetTransactions = validateGetTransactions;
exports.validateGetTransactionsByType = validateGetTransactionsByType;