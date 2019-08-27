const webpack = require("webpack");
const path = require("path");
const packageJson = require("./package.json");
const isProduction = process.env.NODE_ENV === "production";
console.log('Bundling for ' + (isProduction ? 'production' : 'development') + '...');

const webpackExternals = require("@dnnsoftware/dnn-react-common/WebpackExternals");

module.exports = {
    entry: ["./src/main.jsx"],
    optimization: {
        minimize: isProduction
    },
    output: {
        path: path.resolve("../admin/personaBar/scripts/bundles/"),
        filename: "sitegroups-bundle.js",
        publicPath: isProduction ? "" : "http://localhost:8080/dist/"
    },

    module: {
        rules: [
            { test: /\.(js|jsx)$/, enforce: "pre", exclude: /node_modules/, loader: "eslint-loader", options: { fix: true } },
            { test: /\.(js|jsx)$/, exclude: /node_modules/, loaders: ["babel-loader"] },
            { test: /\.(less|css)$/, loader: "style-loader!css-loader!less-loader" },
            { test: /\.(ttf|woff)$/, loader: "url-loader?limit=8192" },
            { test: /\.(gif|png)$/, loader: "url-loader?mimetype=image/png" },
            { test: /\.woff(2)?(\?v=[0-9].[0-9].[0-9])?$/, loader: "url-loader?mimetype=application/font-woff" },
            { test: /\.(ttf|eot|svg)(\?v=[0-9].[0-9].[0-9])?$/, loader: "file-loader?name=[name].[ext]" },
        ]
    },

    resolve: {
        extensions: [".js", ".json", ".jsx"],
        modules: [
            path.resolve("./src"),          // Look in src first
            path.resolve("./node_modules")  // Last fallback to node_modules
        ]
    },
    devServer: {
        headers: { "Access-Control-Allow-Origin": "*" },
        disableHostCheck: true,
        host: '0.0.0.0',
        hot: true,
        inline: true
    },
    externals: webpackExternals,
    devtool: isProduction ? 'source-map':'inline-source-map' ,
    plugins: isProduction ? [
         new webpack.DefinePlugin({
            VERSION: JSON.stringify(packageJson.version),
            "process.env": {
                "NODE_ENV": JSON.stringify("production")
            }
        })
    ] : [
            new webpack.DefinePlugin({
                VERSION: JSON.stringify(packageJson.version)
            })
        ]
};