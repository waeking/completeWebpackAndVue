const path = require("path");
process.chdir(path.join(__dirname,"smoke/template"))
describe('webpack build test case', () => {
    require("./unit/webpack-base-test.js")
});
