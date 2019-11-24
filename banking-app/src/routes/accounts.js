'use strict'
import express from 'express'
let router = express.Router()
const pool = require('../../bin/pool')
const { STATUS_CODE, MESSAGES } = require('../../config/constants')
const {
  validateAccount,
  validateAccountClose
} = require('../validations/accountValidations')

router.get('/:user_id', (req, res) => {
  let sql = `SELECT * FROM accounts WHERE user_id = ${req.params.user_id};`
  pool.query(sql, (err, result) => {
    if (err) {
      console.log(err)
      res
        .status(STATUS_CODE.INTERNAL_SERVER_ERROR)
        .end(MESSAGES.INTERNAL_SERVER_ERROR)
    }
    res.status(STATUS_CODE.SUCCESS).send(result)
  })
})

router.get('/:user_id/:account_type', (req, res) => {
  let sql = `SELECT * FROM accounts WHERE user_id = ${
    req.params.user_id
  } AND account_type LIKE '${req.params.account_type}%';`
  pool.query(sql, (err, result) => {
    if (err) {
      console.log(err)
      res
        .status(STATUS_CODE.INTERNAL_SERVER_ERROR)
        .end(MESSAGES.INTERNAL_SERVER_ERROR)
    }
    res.status(STATUS_CODE.SUCCESS).send(result)
  })
})

router.post('/', (req, res) => {
  const { error } = validateAccount(req.body)
  if (error) res.status(STATUS_CODE.BAD_REQUEST).send(error.details[0].message)

  let account_balance = req.body.account_balance
    ? req.body.account_balance
    : '0'
  let sql = `CALL Accounts_put('${req.body.user_id}', '${
    req.body.account_type
  }', '${account_balance}');`
  pool.query(sql, (err, result) => {
    if (err) {
      console.log(err)
      res
        .status(STATUS_CODE.INTERNAL_SERVER_ERROR)
        .end(MESSAGES.INTERNAL_SERVER_ERROR)
    }
    if (result && result.length > 0 && result[0][0]) {
      res.status(STATUS_CODE.SUCCESS).send(result[0][0].status)
    }
  })
})

router.post('/close', (req, res) => {
  const { error } = validateAccountClose(req.body)
  if (error) res.status(STATUS_CODE.BAD_REQUEST).send(error.details[0].message)

  let sql = `CALL Account_close('${req.body.user_id}', '${
    req.body.account_number
  }');`
  pool.query(sql, (err, result) => {
    if (err) {
      console.log(err)
      res
        .status(STATUS_CODE.INTERNAL_SERVER_ERROR)
        .end(MESSAGES.INTERNAL_SERVER_ERROR)
    }
    if (result && result.length > 0 && result[0][0]) {
      res.status(STATUS_CODE.SUCCESS).end(result[0][0].status)
    }
  })
})

module.exports = router
