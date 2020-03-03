const webpack = require("webpack");
const merge = require("webpack-merge");
const webpackConfig = require("./../webpack.config");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin")
module.exports = merge(webpackConfig,{
    mode:"production",
    module:{
        rules:[
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
            'process.env.NODE_ENV':'"production"'
        }),
        new MiniCssExtractPlugin({
            filename:"[name]_[contenthash:6].css"
        }),
        new OptimizeCssAssetsWebpackPlugin({
            assetNameRegExp:/\.css$/g,
            cssProcessor:require("cssnano")
        }),

    ]
})
