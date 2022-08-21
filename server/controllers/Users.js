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

function getByCode(req, res, next) {
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

function create(req, res, next) {
  var newEvent = new User({});
  return next();
}

function update(req, res, next) {
  return next();
}

function remove(req, res, next) {
  User.findAndRemove({ _id: req.param.id });
  return next();
}

module.exports = { getById, getByCode, create, remove, update };
