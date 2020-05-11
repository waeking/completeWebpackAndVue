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
## travis-ci 持续集成
### 网站：[travis-ci](https://travis-ci.com/)
用github的账号在这里登录且同步即可。
~~~
在项目根目录中配置 .travis.yml 文件

language: node_js

sudo: false

cache:
    apt: true
    directories:
        - node_modules

node_js: stable

install:
    - npm install -D
    - cd ./test/smoke/template
    - npm install -D
    - cd ../../../
scripts:
    - npm test
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
## 速度分析
> 安装包
~~~
    npm i speed-measure-webpack-plugin -D
~~~
> 配置
~~~
在 webpack.base.js 或者 生产中的配置 webpack.prod.js

const SpeedMeasureWebpackPlugin = require("speed-measure-webpack-plugin")

const smp = new SpeedMeasureWebpackPlugin();

smp.wrap(包裹webpack中的代码即可)
~~~
## 体积分析
> 安装包
~~~
    npm i webpack-bundle-analyzer -D
~~~
> 配置
~~~
在 webpack.base.js 或者 生产中的配置 webpack.prod.js

const {BundleAnalyzerPlugin} = require("webpack-bundle-analyzer")

在 plugins数组中添加 new BundleAnalyzerPlugin()  即可
~~~
## 多线程打包
> 安装包
~~~
    npm i thread-loader -D
~~~
> 配置
~~~
在 webpack.base.js 或者 生产中的配置 webpack.prod.js

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
}
~~~
## 多线程并行压缩
> 安装包
~~~
    npm i terser-webpack-plugin -D
~~~
> 配置
~~~
在 webpack.base.js 或者 测试中的配置 webpack.test.js

optimization:{
    minimizer:[
        new TerserWebpackPlugin({
            parallel:true
        })
    ]
}
~~~
## 利用缓存提升二次打包速度
> 安装包
~~~
    方案1：利用babel-loader?cacheDirectory=true

    方案2：利用terserWebpackPlugin
    optimization:{
        minimizer:[
            new TerserWebpackPlugin({
                parallel:true,
                cache:true
            })
        ]
    }

    方案3：利用HardSourceWebpackPlugin
    const HardSourceWebpackPlugin = require("hard-source-webpack-plugin);

    在plugins数组直接new HardSourceWebpackPlugin() 即可

    其中，方案3效果最佳
~~~
> 配置
~~~
在 webpack.base.js 或者 测试中的配置 webpack.test.js

optimization:{
    minimizer:[
        new TerserWebpackPlugin({
            parallel:true
        })
    ]
}
~缓存
