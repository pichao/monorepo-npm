// import TerserPlugin from 'terser-webpack-plugin';
const TerserPlugin = require('terser-webpack-plugin');
// import BundleAnalyzerPlugin from 'webpack-bundle-analyzer';
const commenConfigFunc = require('./webpack.common.config.js');
// import commenConfigFunc from './webpack.common.config.js';

module.exports = (env, argv) => {
    const commenConfig = commenConfigFunc(env, argv);
    return {
        ...commenConfig,
        output: {
            ...commenConfig.output,
            clean: true
        },
        mode: 'production',
        optimization: {
            minimize: true,
            minimizer: [
                new TerserPlugin({
                    extractComments: false, //不将注释提取到单独的文件中,不生成license文件,
                    terserOptions: {
                        compress: {
                            warnings: false,
                            drop_console: true,
                            drop_debugger: true,
                            pure_funcs: ['console.log', 'console.error'] //移除console
                        }
                    }
                })
            ],
            splitChunks: {
                cacheGroups: {
                    vendors: {
                        minChunks: 1,
                        test: /[\\/]node_modules[\\/]/,
                        priority: -10, // 权重
                        minSize: 0
                    },
                    base: {
                        priority: -20, // 权重
                        chunks: 'initial', //initial表示提取入口文件的公共部分
                        minChunks: 2, //表示提取公共部分最少的文件数
                        minSize: 0, //表示提取公共部分最小的大小
                        name: 'base' //提取出来的文件命名
                    }
                }
            }
        },
        plugins: [
            ...commenConfig.plugins
            // new BundleAnalyzerPlugin.BundleAnalyzerPlugin()
        ]
    };
};
