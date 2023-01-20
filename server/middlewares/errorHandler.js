/* eslint-disable no-unused-vars */
const HttpStatus = require("http-status-codes");
const StatusCodes = HttpStatus?.StatusCodes;
const logger = require("../config/logger");

/**
 * Error handler middleware
 *
 * @param  {Object}   err - runtime error
 * @param  {Object}   req - request
 * @param  {Object}   res - response
 */
const errorHandler = (err, req, res, next) => {
    if (err) {
        logger.error(err);
        res.status(err.status || StatusCodes.INTERNAL_SERVER_ERROR).json({
            error: {
                code: err.code || StatusCodes.INTERNAL_SERVER_ERROR,
                message:
                    err.message ||
                    HttpStatus.getStatusText(StatusCodes.INTERNAL_SERVER_ERROR),
            },
        });
    }
};

module.exports = errorHandler;
