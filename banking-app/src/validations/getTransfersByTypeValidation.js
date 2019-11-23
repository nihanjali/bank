"use strict";
const Joi = require("joi");

const validateGetTransfersByType =  (transfer) => {
  const schema = {
    user_id: Joi.number().required(),
    trans_type: Joi.string().required()
  };

  return Joi.validate(transfer, schema);
}

module.exports = validateGetTransfersByType;