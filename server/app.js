/* eslint-disable no-unused-vars */
const path = require("path");
const app = require("./config/express");
const errorHandler = require("./middlewares/errorHandler");
const requestLogger = require("./middlewares/requestLogger");
const apiRouter = require("./routes/api");

const webpack = require("webpack");
const webpackConfig = require("../webpack/webpack.config.dev");
const webpackDevMiddleware = require("webpack-dev-middleware");
const webpackHotMiddleware = require("webpack-hot-middleware");

require("dotenv").config({ path: path.resolve(__dirname, "..", ".env") });

app.set("port", process.env.APP_PORT || 3000);
app.set("host", process.env.APP_HOST || "localhost");

// enable webpack hot module replacement for development
if (process.env.NODE_ENV === "development") {
    const compiler = webpack(webpackConfig);
    app.use(
        webpackDevMiddleware(compiler, {
            noInfo: true,
            publicPath: webpackConfig.output.publicPath + "dist/",
        })
    );
    app.use(webpackHotMiddleware(compiler));
}

// Request logger
app.use(requestLogger);

// Wraps all routes into API route
app.use("/api", apiRouter);

// Landing page
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../dist/index.html"));
});

// Error Handler Middleware
app.use(errorHandler);

app.listen(app.get("port"), app.get("host"), () => {
    console.log(
        `Server running at http://${app.get("host")}:${app.get("port")}`
    );
});

module.exports = app;
