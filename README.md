# 前言
利用webpack和vue搭建项目，里面有eslint，mocha 冒烟测试和单元测试功能，以及px自动转化rem等功能
# 技术选型
webpack vue eslint mocha 等
# 项目运行
### 环境要求：Node >= 10 and Git >= 2.13.0
## 安装 node_modules
~~~
cd completeWebpackAndVue

npm i
~~~
## 开发环境
~~~
npm run dev

访问 http://localhost:9001
~~~
## 生产环境
~~~
npm run build

项目生成在 dist目录
~~~
## 测试环境
~~~
npm run built

项目生成在 dist_test目录
~~~
## eslint 检查代码
~~~
npm run eslint

检查整体代码是否有错误
~~~
## eslint-fix 修复代码
~~~
npm run eslint-fix

自动修复代码错误
~~~

## test 冒烟测试
~~~
npm run test

模拟webpack.base.js 测试
~~~
## cover 测试覆盖率
~~~
npm run cover

模拟webpack.base.js 测试
~~~
# 项目配置
## eslint
> 安装包
~~~
npm i eslint eslint-loader eslint-plugin-vue（或者eslint-plugin-html） eslint-config-standard eslint-plugin-import eslint-plugin-node eslint-plugin-promise eslint-plugin-standard vue-eslint-parser -D
~~~
> .eslintrc 配置
~~~
module.exports = {
    "parser":"vue-eslint-parser",
    "plugins":["vue"],
   // "plugins":["html"],
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
~~~
> webpack.config.js 配置
~~~
module:{
        rules:[
            {
                test:/\.(vue|js|jsx)$/,
                exclude:/node_modules/,
                loader:"eslint-loader",
                enforce:"pre"
            },
        ]
}
~~~

