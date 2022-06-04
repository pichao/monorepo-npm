
const fs = require('fs');
const appDirectory = fs.realpathSync(process.cwd());
const   nodePolyfills = require('rollup-plugin-node-polyfills') ;
const options = {
  entry: `./src/index.ts`, // entry参数最好写相对路径，在打包umd模块式，绝对路径报错
  // doc: {
  //   title: "文档",
  //   themeConfig: { mode: "light" },
  //   base: "/",
  //   port:9999,
  //   noServer:true
  // },
  extraBabelPlugins: [
    [
      "babel-plugin-import",
      {
        libraryName: "antd",
        libraryDirectory: "es",
        style: true
      }
    ],
    
    // [nodeResolve()]
  ],
  nodeResolveOpts:{
    preferBuiltins: true,  // Default: true
  },
 
  // cssModules: true,
  // extractCSS: true,
  lessInBabelMode: true,
  runtimeHelpers: true,
  esm: "babel",
  cjs: "babel",
  umd: false,
  
  extraExternals:[
    "antd",
    "react",
    "crypto-js"
  ],
  autoprefixer: {
    Browserslist: ["ie>9", "Safari >= 6"]
  }
};

export default options;
