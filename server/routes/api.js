const express = require("express");

const app = express();

const addressBooksRouter = require("./addressbooks");
const authRouter = require("./auth");
const commentRouter = require("./comment");
const eventsRouter = require("./partyEvents");
const invitationsRouter = require("./invitations");
const menusRouter = require("./menus");
const playlistRouter = require("./menus");
const usersRouter = require("./users");

/**
 * Initialize Authorization API routes
 */
app.use("/auth", authRouter);

/**
 * Initialize Address books API routes
 */
app.use("/addressbooks", addressBooksRouter);

/**
 * Initialize Comments API routes
 */
app.use("/comments", commentRouter);

/**
 * Initialize Party Events API routes
 */
app.use("/events", eventsRouter);

/**
 * Initialize Invitations API routes
 */
app.use("/invitations", invitationsRouter);

/**
 * Initialize Food menus API routes
 */
app.use("/menus", menusRouter);

/**
 * Initialize Music playlists API routes
 */
app.use("/playlist", playlistRouter);

/**
 * Initialize Users  API routes
 */
app.use("/users", usersRouter);

module.exports = app;
