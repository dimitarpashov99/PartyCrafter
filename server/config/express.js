const express = require("express");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");

const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const dotenv = require("dotenv");

const directory = require("./directory");

const app = express();
dotenv.config();

app.use(cors());
app.use(bodyparser.json());

// set security HTTP headers
app.use(helmet());

app.use(morgan("dev"));

app.use(express.static(directory.distDir));

// initialize MongoDB connection using ODM connection tool
mongoose
    .connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
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

app.use(express.static(directory.assetsDir));

module.exports = app;
