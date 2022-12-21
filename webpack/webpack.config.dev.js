"use strict";
const webpack = require("webpack");
const path = require("path");
const Dotenv = require("dotenv-webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CURRENT_WORKING_DIR = process.cwd();

const config = {
    context: path.resolve(CURRENT_WORKING_DIR, "client/src/"),
    entry: {
        app: ["webpack-hot-middleware/client", "./index.js"],
    },

    mode: "development",
    output: {
        path: path.resolve(CURRENT_WORKING_DIR, "dist"),
        filename: "client.bundle.js",
        publicPath: "/dist/",
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new Dotenv(),
        new MiniCssExtractPlugin({
            filename: "[name].[contenthash].css",
            chunkFilename: "[id].[contenthash].css",
        }),
    ],
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules)/,
                loader: "babel-loader",
                options: {
                    babelrc: false,
                    presets: ["@babel/preset-env", "@babel/preset-react"],
                    cacheDirectory: false,
                    plugins: [
                        "@babel/plugin-proposal-function-bind",
                        "@babel/plugin-proposal-class-properties",
                        "@babel/plugin-transform-runtime",
                    ],
                },
            },
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, "css-loader"],
            },
            {
                test: /\.s[c]ss$/i,
                use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
            },
        ],
    },
    resolve: {
        extensions: [".js", ".jsx"],
    },
    devtool: "inline-source-map",
    devServer: {
        host: process.env.HOST || "localhost",
        port: process.env.PORT || 3000,
        historyApiFallback: true,
        hot: true,
    },
};

module.exports = config;
