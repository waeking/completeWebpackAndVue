const Mocha = require("mocha");
const path = require("path");
const webpack = require("webpack")
const rimraf = require("rimraf");
const mocha = new Mocha({
    timeout:"10000ms"
})
process.chdir(path.join(__dirname,"template"));
rimraf("./dist",() => {
    const prodConfig = require("../../lib/webpack.config.prod");
    webpack(prodConfig,(err,stats) => {
        if(err){
            console.error(err);
            process.exit(2)
        }
        console.log(stats.toString({
            colors:true,
            modules:false,
            children:false
        }));
        console.log("webpack build success,now test begin");
        mocha.addFile(path.join(__dirname,"html-test.js"));
        mocha.addFile(path.join(__dirname,"css-js-test.js"));
        mocha.run();

    })
})
