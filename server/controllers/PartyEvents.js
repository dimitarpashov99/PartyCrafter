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
  var newEvent = new User({
    title: req.body.title,
    description: req.body.title,
    type: req.body.partyType,
    privateAccess: req.body.isPrivate,
    date: req.body.eventDate,
    preferences: {
      musicPreference: false,
      foodPreference: false,
      allowRequests: false,
      allowPhotoUploads: false,
      allowChat: false,
      allowGuestInvites: false,
    },
  });

  newEvent.save();
  return next();
}

function update(req, res, next) {
  var event = Event.findOne({
    code: req.body.eventCode,
  });
  event.save();
  return next();
}

function remove(req, res, next) {
  Event.findAndRemove({ _id: req.param.id });
  return next();
}

function changePreferance(req, res, next) {
  Event.updateOne(
    {
      _id: req.body.id,
    },
    { $set: { preferences: req.body.eventPreferences } },
    (err, doc) => {
      if (!err) {
        res.json(doc.toJson());
      }
    }
  );
  return next();
}

module.exports = {
  getById,
  getByCode,
  create,
  remove,
  update,
  changePreferance,
};
