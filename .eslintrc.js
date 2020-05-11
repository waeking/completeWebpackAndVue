module.exports = {
    "parser":"vue-eslint-parser",
    "plugins":["html"],
    "env":{
        "node":true,
        "browser":true
    },
    "extends":["standard"],
    "rules":{
        "indent":0,
        "semi": 0,  // 语句可以不需要分号结尾"
        "indent":["error", 4]

    }
}
