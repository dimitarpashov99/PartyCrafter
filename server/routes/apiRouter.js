var express = require("express");
var app = express();

var usersRouter = require("./users");
var eventsRouter = require("./events");

app.use("/users", usersRouter);
app.use("/events", eventsRouter);

module.exports = router;
