"use strict";
const express = require("express");

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

const { serverPort } = require("../config");

const loginRouter = require("../src/routes/login");
const usersRouter = require("../src/routes/users");
const accountsRouter = require("../src/routes/accounts");
const transfersRouter = require("../src/routes/transfers");

app.use("/login", loginRouter);
app.use("/users", usersRouter);
app.use("/accounts", accountsRouter);
app.use("/transfers", transfersRouter);

app.listen(serverPort, () => {
    console.log(`Bank Server listening on port ${serverPort}`);
});