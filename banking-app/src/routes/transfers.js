"use strict";
import express from "express";
let router = express.Router();
const pool = require('../../bin/pool');
const { STATUS_CODE, MESSAGES } = require('../../config/constants');
const { validateTransfer } = require("../validations/transferValidations");

router.post("/", (req, res) => {
    const { error } = validateTransfer(req.body);
    if (error)
        res.status(STATUS_CODE.BAD_REQUEST).send(error.details[0].message);
    else {
        let sql = `CALL Transaction_put(${req.body.user_id}, ${req.body.from_account_number}, ${req.body.to_account_number}, ${req.body.trans_amount});`;
        pool.query(sql, (err, result) => {
            if (err) {
                console.log(err);
                res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).send(MESSAGES.INTERNAL_SERVER_ERROR);
            }
            if (result && result.length > 0 && result[0][0]) {
                res.status(STATUS_CODE.SUCCESS).send(result[0][0].status);
            }
        });
    }
});

module.exports = router;