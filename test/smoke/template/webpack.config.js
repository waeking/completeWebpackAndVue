const path = require('path');
const glob = require("glob");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const friendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin")
//const HtmlWebpackExternalsPlugin = require("html-webpack-externals-plugin")
function setMp () {
    let entry = {};
    let htmlPlugin = [];
    let file = glob.sync(path.join(__dirname,"src/*.js"));
    file.map(item => {
        let mach = item.match(/\/src\/(.*).js/)
        let fileName = mach && mach[1];
        entry[fileName] = item;
        htmlPlugin.push(
            new HtmlWebpackPlugin({
                template:path.join(__dirname,`./src/${fileName}.html`),
                filename:`${fileName}.html`,
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
        path:path.join(__dirname,"dist"),
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
                test:/\.js$/,
                loader:"babel-loader"
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
                    }
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
