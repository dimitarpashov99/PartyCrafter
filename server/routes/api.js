const express = require("express");

const app = express();
const usersRouter = require("./users");
const eventsRouter = require("./partyEvents");
const authRouter = require("./auth");

/**
 * Initialize Authorization API routes
 */
app.use("/auth", authRouter);

/**
 * Initialize Users API routes
 */
app.use("/users", usersRouter);

/**
 * Initialize Party Events API routes
 */
app.use("/events", eventsRouter);

module.exports = app;
