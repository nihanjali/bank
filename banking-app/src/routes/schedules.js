"use strict";
import express from "express";
let router = express.Router();
const pool = require('../../bin/pool');
const { STATUS_CODE, MESSAGES } = require('../../config/constants');
const { validateTransferSchedule, validatePaybillSchedule, validateGetSchedules } = require("../validations/scheduleValidations");

router.post("/transfer", (req, res) => {
    const { error } = validateTransferSchedule(req.body);
    if (error)
        res.status(STATUS_CODE.BAD_REQUEST).send(error.details[0].message);

    let sql = ``;
    pool.query(sql, (err, result) => {
        if (err) {
            console.log(err);
            res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).end(MESSAGES.INTERNAL_SERVER_ERROR);
        }
        if (result && result.length > 0 && result[0][0]) {
            res.status(STATUS_CODE.SUCCESS).end(result[0][0].status);
        }
    });
});

router.post("/paybill", (req, res) => {
    const { error } = validatePaybillSchedule(req.body);
    if (error)
        res.status(STATUS_CODE.BAD_REQUEST).send(error.details[0].message);

    let sql = ``;
    pool.query(sql, (err, result) => {
        if (err) {
            console.log(err);
            res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).end(MESSAGES.INTERNAL_SERVER_ERROR);
        }
        if (result && result.length > 0 && result[0][0]) {
            res.status(STATUS_CODE.SUCCESS).end(result[0][0].status);
        }
    });
});

router.get("/:user_id/:account_number", (req, res) => {
    const { error } = validateGetSchedules(req.params);
    if (error)
        res.status(STATUS_CODE.BAD_REQUEST).send(error.details[0].message);

    let sql = ``;
    pool.query(sql, (err, result) => {
        if (err) {
            console.log(err);
            res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).end(MESSAGES.INTERNAL_SERVER_ERROR);
        }

        res.status(STATUS_CODE.SUCCESS).send(result);
    });
});

router.get("/:user_id/:account_number/:trans_type", (req, res) => {
    const { error } = validateGetSchedules(req.params);
    if (error)
        res.status(STATUS_CODE.BAD_REQUEST).send(error.details[0].message);

    let sql = ``;
    pool.query(sql, (err, result) => {
        if (err) {
            console.log(err);
            res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).end(MESSAGES.INTERNAL_SERVER_ERROR);
        }

        res.status(STATUS_CODE.SUCCESS).send(result);
    });
});

module.exports = router;