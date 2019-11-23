"use strict";
import express from "express";
let router = express.Router();
const pool = require('../../bin/pool');
const { STATUS_CODE, MESSAGES } = require('../../config/constants');
const { validatePayBill } = require("../validations/paybillsValidations");

router.post("/", (req, res) => {
    const { error } = validatePayBill(req.body);
    if (error)
        res.status(STATUS_CODE.BAD_REQUEST).send(error.details[0].message);

    let sql = `CALL Bill_Payment_put(${req.body.user_id}, ${req.body.from_account_number}, '${req.body.bill_payee}', ${req.body.trans_amount});`;
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

module.exports = router;