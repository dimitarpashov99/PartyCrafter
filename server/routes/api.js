const express = require("express");

const app = express();
const usersRouter = require("./users");
const eventsRouter = require("./partyEvents");
const authRouter = require("./auth");
// const locationRouter = require("./locations");

app.use("/auth", authRouter);
app.use("/users", usersRouter);
app.use("/events", eventsRouter);
// router.use("/location", locationRouter);

module.exports = app;
