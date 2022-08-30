const Locations = require("../models/location");

const apiResponse = require("../helpers/apiResponse");

const createLocation = (req, res, next) => {
    const newLocation = new Locations({
        name: req.body.locationName,
        details: req.body.locationName,
        address: req.body.address,
        city: req.body.city,
        lng: req.body.locationLng,
        lat: req.body.locationLat,
    });

    newLocation.save(function (err) {
        if (err) {
            apiResponse.errorResponse(res, "Location cannot be created");
        } else {
            apiResponse.successResponse(res, "Location created");
        }
    });
    next();
};

const getById = (req, res, next) => {
    Locations.findOne({
        _id: res.body.locationId,
    }).then((doc) => {
        if (!doc) {
            apiResponse.notFoundResponse(res, "Location not found");
        } else {
            apiResponse.successResponseWithData(
                res,
                "Location found",
                doc.toJSON()
            );
        }
    });
    next();
};

const removeLocation = (req, res, next) => {
    Locations.findOneAndDelete(
        {
            _id: req.locationId,
        },
        (err, doc) => {
            if (err) {
                apiResponse.errorResponse(res, "Location cannot be removed");
            } else {
                if (!doc) {
                    apiResponse.notFoundResponse(res, "Location not found");
                } else {
                    apiResponse.successResponse(
                        res,
                        "Location removed successfully"
                    );
                }
            }
        }
    );
    next();
};
module.exports = { createLocation, getById, removeLocation };
