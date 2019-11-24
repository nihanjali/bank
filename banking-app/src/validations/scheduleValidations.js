"use strict";
const Joi = require("joi");

function validateTransferSchedule(schedule) {
  const schema = {
    user_id: Joi.number().required(),
    from_account_number: Joi.number().required(),
    to_account_number: Joi.number().required(),
    trans_amount: Joi.number().required(),
    transfer_interval_days: Joi.number().required()
  };

  return Joi.validate(schedule, schema);
}

function validatePaybillSchedule(schedule) {
  const schema = {
    user_id: Joi.number().required(),
    from_account_number: Joi.number().required(),
    bill_payee: Joi.string(),
    trans_amount: Joi.number().required(),
    transfer_interval_days: Joi.number().required()
  };

  return Joi.validate(schedule, schema);
}

function validateGetSchedules(schedule) {
  const schema = {
    user_id: Joi.number().required(),
    account_number: Joi.number().required(),
    trans_type: Joi.string()
  };

  return Joi.validate(schedule, schema);
}

exports.validateTransferSchedule = validateTransferSchedule;
exports.validatePaybillSchedule = validatePaybillSchedule;
exports.validateGetSchedules = validateGetSchedules;