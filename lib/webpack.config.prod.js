const webpack = require("webpack");
const glob = require("glob");
const path = require("path");
const merge = require("webpack-merge");
const webpackConfig = require("./../webpack.config");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin")
const speedMeasureWebpackPlugin = require("speed-measure-webpack-plugin");
const {BundleAnalyzerPlugin} = require("webpack-bundle-analyzer");
const HardSourceWebpackPlugin = require("hard-source-webpack-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");
const PurgecssWebpackPlugin = require("purgecss-webpack-plugin");
const smp = new speedMeasureWebpackPlugin();
const PATHS = {
    src: path.join(__dirname, 'src')
  }
module.exports = smp.wrap(merge(webpackConfig,{
    mode:"production",
    module:{
        rules:[
            {
                test:/\.js$/,
                use:[
                    {
                        loader:"thread-loader",
                        options:{
                            workers:3
                        }
                    },
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
            'process.env.NODE_ENV':'"production"'
        }),
        new MiniCssExtractPlugin({
            filename:"[name]_[contenthash:6].css"
        }),
        new OptimizeCssAssetsWebpackPlugin({
            assetNameRegExp:/\.css$/g,
            cssProcessor:require("cssnano")
        }),
       // new BundleAnalyzerPlugin(),
        new webpack.DllReferencePlugin({
            manifest:require("./../dll/vue-manifest.json")
        }),
        new HardSourceWebpackPlugin(),
       // new PurgecssWebpackPlugin({
         //   paths:glob.sync(`${PATHS.src}/**/*`,  { nodir: true }),
        //})
    ],
    optimization:{
        minimizer:[
            new TerserWebpackPlugin({
                parallel:true,
            })
        ]
    }
}))
