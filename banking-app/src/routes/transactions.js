"use strict";
import express from "express";
let router = express.Router();
const pool = require('../../bin/pool');
const { STATUS_CODE, MESSAGES } = require('../../config/constants');
const { validateGetTransactions, validateGetTransactionsByType } = require("../validations/transactionValidations");

router.get("/:user_id/:account_number", (req, res) => {
    const { error } = validateGetTransactions(req.params);
    if (error)
        res.status(STATUS_CODE.BAD_REQUEST).send(error.details[0].message);

    let sql = `select * from transactions where (from_account_number=${req.params.account_number} OR to_account_number=${req.params.account_number}) AND user_id=${req.params.user_id}`;
    pool.query(sql, (err, result) => {
        if (err) {
            console.log(err);
            res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).end(MESSAGES.INTERNAL_SERVER_ERROR);
        }

        res.status(STATUS_CODE.SUCCESS).send(result);
    });
});

router.get("/:user_id/:account_number/:trans_type", (req, res) => {
    const { error } = validateGetTransactionsByType(req.params);
    if (error)
        res.status(STATUS_CODE.BAD_REQUEST).send(error.details[0].message);
    let sql = '';
    if (req.params.trans_type == 'DEBIT') {
        sql = `select * from transactions where user_id=${req.params.user_id} AND from_account_number=${req.params.account_number}`;
    } else if (req.params.trans_type == 'CREDIT') {
        sql = `select * from transactions where user_id=${req.params.user_id} AND to_account_number=${req.params.account_number}`;
    } else {
        sql = `select * from transactions where user_id=${req.params.user_id} AND (from_account_number=${req.params.account_number} OR to_account_number=${req.params.account_number}) AND trans_type LIKE '${req.params.trans_type}%'`;
    }

    pool.query(sql, (err, result) => {
        if (err) {
            console.log(err);
            res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).end(MESSAGES.INTERNAL_SERVER_ERROR);
        }

        res.status(STATUS_CODE.SUCCESS).send(result);
    });
});

module.exports = router;