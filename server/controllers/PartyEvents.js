const Event = require("../models/event");

function getById(req, res, next) {
  var requestedId = req.params.id;
  let partyEvent = Event.find({
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
  let partyEvent = Event.find({
    _id: requestedId,
  });

  res.status(200);
  res.json({
    partyEvent: partyEvent,
  });
  return next();
}

function create(req, res, next) {
  var newEvent = new Event({});
  return next();
}

function update(req, res, next) {
  var newEvent = new Event({});
  return next();
}

function remove(req, res, next) {
  Event.findAndRemove({ _id: req.param.id });
  return next();
}

module.exports = { getById, getByCode, create, remove , update};
