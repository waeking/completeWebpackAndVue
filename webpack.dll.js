const path = require("path");
const webpack = require("webpack");

module.exports = {
    entry:{
        vue:[
            'vue'
        ]
    },
    output:{
        filename:'[name]_[hash].dll.js',
        path:path.join(__dirname,"dll"),
        library:'[name]_[hash]'
    },
    plugins:[
        new webpack.DllPlugin({
            name:"[name]_[hash]",
            path:path.join(__dirname,"dll/[name]-manifest.json"),
        })
    ]
}
