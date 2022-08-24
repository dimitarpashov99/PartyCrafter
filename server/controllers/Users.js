const User = require("../models/event");

function getById(req, res, next) {
  var requestedId = req.params.id;
  let partyEvent = User.find({
    _id: requestedId,
  });

  res.status(200);
  res.json({
    partyEvent: partyEvent,
  });
  return next();
}

function getByUsername(req, res, next) {
  var requestedId = req.params.eventCode;
  let partyEvent = User.find({
    _id: requestedId,
  });

  res.status(200);
  res.json({
    partyEvent: partyEvent,
  });
  return next();
}

function changeUsername(req, res, next) {
  return next();
}

function changeEmail(req, res, next) {
  return next();
}

function changePassword(req, res, next) {
  return next();
}
module.exports = {
  getById,
  getByUsername,
  changeUsername,
  changeEmail,
  changePassword,
};
