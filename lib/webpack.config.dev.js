const webpack = require("webpack");
const path = require("path")
const merge = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin")
let webpackConfig = require("../webpack.config")
module.exports = merge(webpackConfig,{
    mode:"development",
    module:{
        rules:[
            {
                test:/\.js$/,
                use:[
                    "babel-loader"
                ]
            },
            {
                test:/\.css$/,
                use:[
                    'style-loader',
                    'css-loader',
                    {
                        loader:"postcss-loader",
                        options:{
                            sourceMap:true
                        }
                    },
                    {
                        loader:"px2rem-loader",
                        options:{
                            remUnit:100,
                            remPrecision:3,
                        }
                    }
                ]
            },
            {
                test:/\.less$/,
                use:[
                    'style-loader',
                    "css-loader",
                    {
                        loader:"postcss-loader",
                        options:{
                            sourceMap:true
                        }
                    },
                    {
                        loader:"px2rem-loader",
                        options:{
                            remUnit:100,
                            remPrecision:3,
                        }
                    },
                    "less-loader"
                ]
            },
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            template:path.join(__dirname,"../src/index.html"),
        }),

    ],
    devtool:"#@cheap-module-eval-source-map",
    devServer:{
        port:9001,
        host:"0.0.0.0",
        overlay:{
            errors:true
        },
        hot:true,
        stats:"errors-only"
    }
})
