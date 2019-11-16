"use strict";
import express from "express";
let router = express.Router();
const pool = require('../../bin/pool');
const { STATUS_CODE, MESSAGES } = require('../../config/constants');

router.get("/:user_id", (req, res) => {
    let sql = `CALL Accounts_get('${req.params.user_id}', NULL);`;
    pool.query(sql, (err, result) => {
        if (err) {
            console.log(err);
            res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).end(MESSAGES.INTERNAL_SERVER_ERROR);
          }
          if (result && result.length > 0 && result[0][0]) {
            res.status(STATUS_CODE.SUCCESS).end(JSON.stringify(result[0]));
          }
    });
});

router.get("/:user_id/:account_type", (req, res) => {
    let sql = `CALL Accounts_get('${req.params.user_id}', '${req.params.account_type}');`;
    pool.query(sql, (err, result) => {
        if (err) {
            console.log(err);
            res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).end(MESSAGES.INTERNAL_SERVER_ERROR);
          }
          if (result && result.length > 0 && result[0][0]) {
            res.status(STATUS_CODE.SUCCESS).end(JSON.stringify(result[0]));
          }
    });
});

router.post("/", (req, res) => {
    let account_balance = req.body.account_balance ? req.body.account_balance : '0';
    let sql = `CALL Accounts_put('${req.body.user_id}', '${req.body.account_type}', '${account_balance}');`;
    pool.query(sql, (err, result) => {
        if (err) {
            console.log(err);
            res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).end(MESSAGES.INTERNAL_SERVER_ERROR);
          }
          if (result && result.length > 0 && result[0][0]) {
            res.status(STATUS_CODE.SUCCESS).end(JSON.stringify(result[0]));
          }
    });
});

router.post("/deactivate", (req, res) => {
    let sql = `CALL Account_deactivate('${req.body.user_id}', '${req.body.account_number}');`;
    pool.query(sql, (err, result) => {
        if (err) {
            console.log(err);
            res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).end(MESSAGES.INTERNAL_SERVER_ERROR);
          }
          if (result && result.length > 0 && result[0][0]) {
            res.status(STATUS_CODE.SUCCESS).end(JSON.stringify(result[0]));
          }
    });
});

module.exports = router;