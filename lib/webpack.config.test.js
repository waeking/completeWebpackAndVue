const path = require("path")
const webpack = require("webpack");
const merge = require("webpack-merge");
const webpackConfig = require("./../webpack.config");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin")
module.exports = merge(webpackConfig,{
    mode:"production",
    output:{
        path:path.join(__dirname,"./../dist_test"),
        filename:'[name]_[hash:6].js'
    },
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
                    MiniCssExtractPlugin.loader,
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
                    MiniCssExtractPlugin.loader,
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
        new webpack.DefinePlugin({
            'process.env.NODE_ENV':'"development"'
        }),
        new MiniCssExtractPlugin({
            filename:"[name]_[contenthash:6].css"
        }),
        new OptimizeCssAssetsWebpackPlugin({
            assetNameRegExp:/\.css$/g,
            cssProcessor:require("cssnano")
        }),
    ],
})
