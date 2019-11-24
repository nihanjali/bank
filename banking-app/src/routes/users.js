"use strict";
import express from "express";
let router = express.Router();
const pool = require('../../bin/pool');
const passwordHash = require('password-hash');
const { STATUS_CODE, MESSAGES } = require('../../config/constants');
const { validateUser } = require("../validations/userValidations");

router.post("/", (req, res) => {
    const { error } = validateUser(req.body);
    if (error)
        res.status(STATUS_CODE.BAD_REQUEST).send(error.details[0].message);

    let user_type = req.body.user_type ? '\'' + req.body.user_type + '\'' : 'NULL';
    let hashedPassword = passwordHash.generate(req.body.password);
    let sql = `CALL User_put('${req.body.name}', '${req.body.email_id}', '${hashedPassword}', ${user_type});`;
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

module.exports = router;