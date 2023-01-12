const express = require("express");

const app = express();

const eventsRouter = require("./partyEvents");
const authRouter = require("./auth");
const accuntRouter = require("./account");

/**
 * Initialize Authorization API routes
 */
app.use("/auth", authRouter);

/**
 * Initialize Party Events API routes
 */
app.use("/events", eventsRouter);

/**
 * Initialize User Account API routes
 */
app.use("/account", accuntRouter);

module.exports = app;
