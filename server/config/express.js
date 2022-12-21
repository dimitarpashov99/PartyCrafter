const createError = require("http-errors");
const express = require("express");
const mongoose = require("mongoose");

const bodyparser = require("body-parser");
const xss = require("xss-clean");
const mongoSanitize = require("express-mongo-sanitize");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const helmet = require("helmet");
const dotenv = require("dotenv");
const morgan = require("morgan");
const directory = require('./directory')
const apiRouter = require("../routes/api");
const apiResponse = require("../helpers/apiResponse");

const app = express();
dotenv.config();

app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(cookieParser());

// wraps all routes into API route
app.use("/api", apiRouter);

// set security HTTP headers
app.use(helmet());

// sanitize request data
app.use(xss());
app.use(mongoSanitize());

app.use(morgan("dev"));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

app.use(express.static(directory.distDir));

// initialize MongoDB connection using ODM connection
mongoose
    .connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        //don't show the log when it is test
        if (process.env.NODE_ENV !== "test") {
            console.log("Connected to " + process.env.MONGODB_URL);
            console.log("App is running ... \n");
            console.log("Press CTRL + C to stop the process. \n");
        }
    })
    .catch((err) => {
        console.error("App starting error:", err.message);
        process.exit(1);
    });

app.all("*", function (req, res) {
    return apiResponse.notFoundResponse(res, "Page not found");
});

app.use((err, req, res, next) => {
    if (err.name == "UnauthorizedError") {
        return apiResponse.unauthorizedResponse(res, err.message);
    }
    next();
});
app.use(express.static(directory.assetsDir));

module.exports = app;
