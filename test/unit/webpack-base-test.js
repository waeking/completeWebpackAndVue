const assert = require("assert");
describe('webpack.base.js test cases', () => {
    const baseConfig = require("./../../webpack.config")
    it('entry', () => {
        assert.equal(baseConfig.entry.index.indexOf("src/index.js") > -1,true)
        assert.equal(baseConfig.entry.search.indexOf("src/search.js") > -1,true)
    });

});
