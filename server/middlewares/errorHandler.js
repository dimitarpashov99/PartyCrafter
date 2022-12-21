const HttpStatus = require("http-status-codes");
const logger = require("../config/winston");

/**
 * NOT_FOUND(404) middleware to catch error response
 *
 * @param  {Object}   req
 * @param  {Object}   res
 * @param  {Function} next
 */
function notFound(req, res) {
    res.status(HttpStatus.NOT_FOUND).json({
        error: {
            code: HttpStatus.NOT_FOUND,
            message: HttpStatus.getStatusText(HttpStatus.NOT_FOUND),
        },
    });
}

/**
 * METHOD_NOT_ALLOWED(405) middleware to catch error response.
 * It should be placed at the very bottom of the middleware stack.
 *
 * @param {Object} req
 * @param {Object} res
 */
function methodNotAllowed(req, res) {
    res.status(HttpStatus.METHOD_NOT_ALLOWED).json({
        error: {
            code: HttpStatus.METHOD_NOT_ALLOWED,
            message: HttpStatus.getStatusText(HttpStatus.METHOD_NOT_ALLOWED),
        },
    });
}

/**
 * Generic error response middleware
 *
 * @param  {Object}   err
 * @param  {Object}   req
 * @param  {Object}   res
 * @param  {Function} next
 */
function genericErrorHandler(err, req, res) {
    logger.error(err);
    res.status(err.status || HttpStatus.INTERNAL_SERVER_ERROR).json({
        error: {
            code: err.code || HttpStatus.INTERNAL_SERVER_ERROR,
            message:
                err.message ||
                HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR),
        },
    });
}

module.exports = {
    notFound,
    methodNotAllowed,
    genericErrorHandler,
};
