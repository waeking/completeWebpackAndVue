const path = require('path');
const glob = require("glob");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const friendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin")
//const HtmlWebpackExternalsPlugin = require("html-webpack-externals-plugin")
let projectRoot = process.cwd()
function setMp () {
    let entry = {};
    let htmlPlugin = [];
    let file = glob.sync(path.join(projectRoot,"src/*.js"));
    file.map(item => {
        let mach = item.match(/\/src\/(.*).js/)
        let fileName = mach && mach[1];
        entry[fileName] = item;
        htmlPlugin.push(
            new HtmlWebpackPlugin({
                template:path.join(projectRoot,`./src/${fileName}.html`),
                filename:`${fileName}.html`,
                chunks: [fileName],
                isProd: process.env.NODE_ENV === 'production',
                minify:{
                    html5:true,
                    collapseWhitespace:true,
                    preserveLineBreaks:false,
                    minifyCSS:true,
                    minifyJS:true,
                    removeComments:true
                }
            })
        )
    })
    return {
        entry,
        htmlPlugin
    }

}
let {entry,htmlPlugin} = setMp()
module.exports = {
    entry:entry,
    output:{
        path:path.join(projectRoot,"dist"),
        filename:'[name]_[hash:6].js'
    },
    module:{
        rules:[
            {
                test:/\.(vue|js|jsx)$/,
                exclude:/node_modules/,
                loader:"eslint-loader",
                enforce:"pre"
            },
            {
                test:/\.vue$/,
                loader:"vue-loader"
            },
            {
                test:/\.(jpg|jpeg|gif|png|svg)$/,
                use:[
                    {
                        loader:"url-loader",
                        options:{
                            limit:1024,
                            name:'img/[name]_[contenthash:6].[ext]'
                        }
                    },
                    /* {
                        loader:"image-webpack-loader",
                        options: {
                            mozjpeg: {
                              progressive: true,
                              quality: 65
                            },
                            // optipng.enabled: false will disable optipng
                            optipng: {
                              enabled: false,
                            },
                            pngquant: {
                              quality: [0.65, 0.90],
                              speed: 4
                            },
                            gifsicle: {
                              interlaced: false,
                            },
                            // the webp option will enable WEBP
                            webp: {
                              quality: 75
                            }
                          }
                    } */
                ]
            }
        ]
    },
    plugins:[
        new VueLoaderPlugin(),
        new friendlyErrorsWebpackPlugin(),
        function (){
            this.hooks.done.tap("done",(stats) => {
                if(stats.compilation.errors && stats.compilation.errors.length && process.argv.indexOf("--watch") == -1){
                    console.log(stats.compilation.errors);
                    process.exit(1)
                }
            })
        }
        /* new HtmlWebpackExternalsPlugin({
            externals:[{
                module:"vue",
                entry:'https://cdn.jsdelivr.net/npm/vue/dist/vue.js',
                global:"Vue"
            }]
        }) */
    ].concat(htmlPlugin),
    optimization:{
        splitChunks:{
            cacheGroups:{
                vendors:{
                    test:/[\\/]node_modules[\\/]/,
                    priority:-10,
                    chunks:"initial",
                    name:'vendors',
                },
            }
        }
    },
    stats:"errors-only"
}
