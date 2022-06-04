# 项目说明

    1. 该项目采用lerna结合yarn的workspaces管理packages；其中components包含ui组件，utils包含工具函数方法，yStorybook是组件及文档，使用storybook生成文档
    2. 采用基于rollup的umi father打包esm和cjs格式包
    3. 组件结合babel-plugin-import按需打包样式，组件设计遵循babel-plugin-import规范，即，样式文件在style文件夹中，参考Dupload组件demo
        在.bablerc中添加
        [
            'import',
            {
                libraryName: '@yyds-npm/components',
                libraryDirectory: 'es',
                style: true, // `style: true` 会加载 scss 文件
                camel2DashComponentName: false
            },
            'yyds'
        ],
    4. package.json里main和module字段分别对应npm包cjs和esm格式路径

    5. 本地开发测试组件和工具方法时，可以在yStorybook  package里引入相应的组件及方法，执行storybook:server:dev，顺便编写文档

## lerna 使用

    1. lerna管理packages，每个packages版本号独立
    2. 使用yarn添加依赖，会将包添加进根目录node_modules,特殊需要放在子packages里，执行 lerna add 包名 --scope=packagename
    3. 本地开发时，子packages互相依赖，可以直接执行lerna add 包名A --scope=包名B,将包A添加到包B的依赖中
    4. 发布，打包需要发布的package之后，登录npm，执行lerna publish ，lerna会自动更新版本号，根据npm包发布版本号规则，选择major、minor、patch等
    5. 不需要发布的package，须将package.json的private设为true

### 打包命令，详见根目录 package.json 里 script

#### lerna 相关知识请查阅 https://github.com/lerna/lerna

##### 关于 CJS、AMD、UMD、ESM

    1. CJS 是 CommonJS 的缩写。
        标志是module.exports，CJS 是同步导入模块，当 CJS 导入时，它会给你一个导入对象的副本
        CJS 不能在浏览器中工作。它必须经过转换和打包

    2. AMD 代表异步模块定义。示例代码，由define定义，返回的也是函数
        define(function (require) {
            var dep1 = require('dep1'),
                dep2 = require('dep2');
            return function () {};

        });
    一开始被提议的时候，AMD 是为前端而做的(而 CJS 是后端)

    3.UMD 代表通用模块定义（Universal Module Definition），由自执行函数组成
        (function (root, factory) {
            if (typeof define === "function" && define.amd) {
                define(["jquery", "underscore"], factory);
            } else if (typeof exports === "object") {
                module.exports = factory(require("jquery"), require("underscore"));
            } else {
                root.Requester = factory(root.$, root._);
            }
        }(this, function ($, _) {
            // this is where I defined my module implementation

            var Requester = { // ... };

            return Requester;
        }));
        当使用 Rollup/Webpack 之类的打包器时，UMD 通常用作备用模块

    4. ESM 代表 ES 模块。Javascript 提出的实现一个标准模块系统的方案
        import React from 'react';
        得益于 ES6 的静态模块结构，可以进行 Tree Shaking，ESM 允许像 Rollup 这样的打包器，删除不必要的代码，减少代码包可以获得更快的加载
