"use strict";
const webpack = require("webpack");
const path = require("path");
const Dotenv = require("dotenv-webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const CURRENT_WORKING_DIR = process.cwd();
const config = {
    context: path.resolve(CURRENT_WORKING_DIR, "client/src/"),
    entry: {
        app: ["webpack-hot-middleware/client", "./index.js"],
    },
    // devServer: {
    //     // host: process.env.HOST || "localhost",
    //     // port: process.env.PORT || 3000,
    //     historyApiFallback: { index: "dist/index.html" },
    //     hot: true,
    //     contentBase: path.resolve(__dirname, "dist"),
    // },
    mode: "development",
    output: {
        path: path.resolve(CURRENT_WORKING_DIR, "dist"),
        filename: "client.bundle.js",
        publicPath: "/",
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: "../public/index.html",
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new Dotenv(),
        new MiniCssExtractPlugin({
            filename: "[name].css",
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
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: "",
                        },
                    },
                    {
                        loader: "css-loader",
                        options: {
                            importLoaders: 1,
                            modules: false,
                        },
                    },
                ],
            },
            {
                test: /\.s[c]ss$/i,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: "",
                        },
                    },
                    {
                        loader: "css-loader",
                        options: {
                            importLoaders: 1,
                            modules: false,
                        },
                    },
                    "sass-loader",
                ],
            },
        ],
    },
    resolve: {
        extensions: ["*", ".js", ".jsx"],
    },
    devtool: "inline-source-map",
};

module.exports = config;
