"use strict";
const express = require("express");

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

const { serverPort } = require("../config");

const accountsRouter = require("../src/routes/accounts");

app.use("/accounts", accountsRouter);

app.listen(serverPort, () => {
    console.log(`Bank Server listening on port ${serverPort}`);
});