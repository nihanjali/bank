import express from 'express';
let router = express.Router();
import accountController from '../controller/accounts';

// include validators and add passport set-up
router.get(
    '/',
    accountController.testMessage
);

module.exports = router;