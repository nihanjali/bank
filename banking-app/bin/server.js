"use strict";
const express = require("express");

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

const { serverPort } = require("../config");

const loginRouter = require("../src/routes/login");
const userRouter = require("../src/routes/users");
const accountRouter = require("../src/routes/accounts");
const transferRouter = require("../src/routes/transfers");
const paybillRouter = require("../src/routes/paybills");
const refundRouter = require("../src/routes/refund");

app.use("/login", loginRouter);
app.use("/user", userRouter);
app.use("/account", accountRouter);
app.use("/transfer", transferRouter);
app.use("/paybill", paybillRouter);
app.use("/refund", refundRouter);

app.listen(serverPort, () => {
    console.log(`Bank Server listening on port ${serverPort}`);
});