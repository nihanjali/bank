"use strict";
const Joi = require("joi");

const validateGetTransfers =  (transfer) => {
  const schema = {
    user_id: Joi.number().required(),
    account_number: Joi.number().required()
  };

  return Joi.validate(transfer, schema);
}

module.exports = validateGetTransfers;