"use strict";
import express from "express";
let router = express.Router();
const pool = require('../../bin/pool');
const { STATUS_CODE, MESSAGES } = require('../../config/constants');
const { validateTransfer } = require("../validations/transferValidations");
import validateGetTransfers from "../validations/getTransfersValidation";
import validateGetTransfersByType from "../validations/getTransfersByTypeValidation";

router.post("/", (req, res) => {
    const { error } = validateTransfer(req.body);
    if (error)
        res.status(STATUS_CODE.BAD_REQUEST).send(error.details[0].message);

    let sql = `CALL Transaction_put(${req.body.user_id}, ${req.body.from_account_number}, ${req.body.to_account_number}, ${req.body.trans_amount});`;
    pool.query(sql, (err, result) => {
        if (err) {
            console.log(err);
            res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).end(MESSAGES.INTERNAL_SERVER_ERROR);
        }
        if (result && result.length > 0 && result[0][0]) {
            res.status(STATUS_CODE.SUCCESS).end(JSON.stringify(result[0][0].status));
        }
    });
});

router.get("/:user_id", (req, res) => {
    const { error } = validateGetTransfers(req.params);
    if (error)
        res.status(STATUS_CODE.BAD_REQUEST).send(error.details[0].message);

    let sql = `select * from transactions where from_account_number=${req.params.user_id} OR to_account_number=${req.params.user_id}`;
    pool.query(sql, (err, result) => {
        if (err) {
            console.log(err);
            res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).end(MESSAGES.INTERNAL_SERVER_ERROR);
        }
        
        res.status(STATUS_CODE.SUCCESS).send(result);
    });
});

router.get("/:user_id/:trans_type", (req, res) => {
    const { error } = validateGetTransfersByType(req.params);
    if (error)
        res.status(STATUS_CODE.BAD_REQUEST).send(error.details[0].message);

    let sql = `select * from transactions where (from_account_number=${req.params.user_id} OR to_account_number=${req.params.user_id}) AND trans_type LIKE "${req.params.trans_type}"`;
    pool.query(sql, (err, result) => {
        if (err) {
            console.log(err);
            res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).end(MESSAGES.INTERNAL_SERVER_ERROR);
        }
        
        res.status(STATUS_CODE.SUCCESS).send(result);
    });
});

module.exports = router;