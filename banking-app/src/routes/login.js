"use strict";
import express from "express";
let router = express.Router();
const pool = require('../../bin/pool');
const passwordHash = require('password-hash');
const jwt = require('jsonwebtoken');
const { secret } = require("../../config");
const { STATUS_CODE, MESSAGES } = require('../../config/constants');
const { validateLogin } = require("../validations/loginValidations");

router.post("/", (req, res) => {
    const { error } = validateLogin(req.body);
    if (error)
        res.status(STATUS_CODE.BAD_REQUEST).send(error.details[0].message);

    let sql = `CALL Password_get('${req.body.email_id}');`;
    pool.query(sql, (err, result) => {
        if (err) {
            console.log(err);
            res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).end(MESSAGES.INTERNAL_SERVER_ERROR);
        }
        if (result && result.length > 0 && result[0][0] && result[0][0].password) {
            if (passwordHash.verify(req.body.password, result[0][0].password)) {
                const payload = {
                    email_id: req.body.email_id
                };
                const token = jwt.sign(payload, secret, {
                    expiresIn: 900000 // in seconds
                });
                let response = {
                    status: MESSAGES.SUCCESS,
                    token: 'JWT ' + token
                };
                res.status(STATUS_CODE.SUCCESS).end(response);
            }
            else {
                res.status(STATUS_CODE.UNAUTHORIZED).end(MESSAGES.INVALID_CREDENTIALS);
            }
        }
        else {
            res.status(STATUS_CODE.UNAUTHORIZED).end(MESSAGES.INVALID_CREDENTIALS);
        }
    });
});

module.exports = router;