const express = require("express");

const app = express();

const eventsRouter = require("./partyEvents");
const authRouter = require("./auth");
const commentRouter = require("./comment");
const invitationsRouter = require("./invitations");
const menusRouter = require("./menus");
const playlistRouter = require("./menus");
const usersRouter = require('./us')

/**
 * Initialize Authorization API routes
 */
app.use("/auth", authRouter);

/**
 * Initialize Party Events API routes
 */
app.use("/events", eventsRouter);

// /**
//  * Initialize User Account API routes
//  */
// app.use("/account", accuntRouter);

/**
 * Initialize Comments API routes
 */
app.use("/comments", commentRouter);

/**
 * Initialize Invitations API routes
 */
app.use("/invitations", invitationsRouter);

/**
 * Initialize Invitations API routes
 */
app.use("/invitations", invitationsRouter);

/**
 * Initialize Invitations API routes
 */
app.use("/invitations", invitationsRouter);
module.exports = app;
