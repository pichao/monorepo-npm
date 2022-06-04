// import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
// import commenConfigFunc from './webpack.common.config.js';
const commenConfigFunc = require('./webpack.common.config.js');
const webpack = require('webpack');
const portfinder = require('portfinder');
module.exports = async (env, argv) => {
    const commenConfig = commenConfigFunc(env, argv);
    const port = await portfinder.getPortPromise({
        // 9000-9099可用端口
        port: 9000,
        stopPort: 9099
    });
    return {
        ...commenConfig,

        mode: 'development',
        devtool: 'source-map',
        plugins: [...commenConfig.plugins],
        devServer: {
            port,
            hot: true,
            open: true,
            historyApiFallback: true, // 开发环境防止路由404
            proxy: {
                '/tsoadmin': {
                    target: process.env.apiProxy,
                    changeOrigin: true
                    // http2: true
                    // pathRewrite: { '^/api': '' },
                    // secure: false
                },
                '/ipLimit': {
                    target: process.env.apiProxy,
                    changeOrigin: true
                    // http2: true
                    // pathRewrite: { '^/api': '' },
                    // secure: false
                },
                '/coin': {
                    target: process.env.apiProxy,
                    changeOrigin: true
                    // http2: true
                    // pathRewrite: { '^/api': '' },
                    // secure: false
                },
                '/central': {
                    target: process.env.apiProxy,
                    changeOrigin: true
                    // http2: true
                    // pathRewrite: { '^/api': '' },
                    // secure: false
                }
            }
        }
    };
};
