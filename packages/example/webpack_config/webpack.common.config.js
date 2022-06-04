const webpack = require('webpack');
// const CopyWebpackPlugin = require('copy-webpack-plugin');
const AntdDayjsWebpackPlugin = require('antd-dayjs-webpack-plugin');

const HtmlWebpackPlugin = require('html-webpack-plugin');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const path = require('path');

module.exports = (env, argv) => {
    const buildProdMode = process.env.NODE_ENV === 'production';
    return {
        entry: [`./src/index.tsx`],
        target: 'web',
        // experiments: {
        //     topLevelAwait: true
        // },
        output: {
            publicPath: '/',
            path: path.resolve(__dirname, '../dist'),
            filename: 'static/js/[name].[contenthash:8].js'
        },
        resolve: {
            extensions: ['.ts', '.tsx', '.js', '.jsx', '.json', '.scss'],
            alias: {
                '@': path.resolve(__dirname, '../src'),
                react: 'preact/compat',
                'react-dom': 'preact/compat',
                'react/jsx-runtime': 'preact/jsx-runtime'
            }
        },

        module: {
            rules: [
                {
                    test: /\.(ts|tsx)$/,

                    use: [
                        {
                            loader: 'thread-loader'
                        },
                        {
                            loader: 'babel-loader',
                            options: {
                                cacheDirectory: true
                            }
                        }
                    ]
                },

                {
                    test: /\.less$/,
                    use: [
                        {
                            loader: MiniCssExtractPlugin.loader,
                            options: {
                                esModule: false
                            }
                        },

                        {
                            loader: 'css-loader' // translates CSS into CommonJS
                        },
                        {
                            loader: 'less-loader', // compiles Less to CSS
                            options: {
                                lessOptions: {
                                    math: 'always',
                                    javascriptEnabled: true
                                }
                            }
                        }
                    ]
                },
                {
                    test: /\.(s[ac]|c)ss$/i,
                    use: [
                        {
                            loader: MiniCssExtractPlugin.loader,
                            options: {
                                esModule: false
                            }
                        },
                        {
                            loader: 'css-loader',
                            options: {
                                modules: {
                                    localIdentName: '[local]--[hash:base64:6]',
                                    auto: true // 为true时，样式文件以module.(s)css结尾时，启用css模块化
                                }
                            }
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                postcssOptions: {
                                    plugins: [
                                        [
                                            'postcss-preset-env',
                                            {
                                                // 其他选项
                                            }
                                        ]
                                    ]
                                }
                            }
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                additionalData: require('fs').readFileSync(
                                    path.resolve(__dirname, '../theme.scss'),
                                    'utf8'
                                )
                            }
                        }
                        // {
                        //     loader: 'sass-resources-loader',
                        //     options: {
                        //         resources: path.resolve(
                        //             __dirname,
                        //             `../packages/management-finance/src/resources/index.scss`
                        //         )
                        //     }
                        // }
                        // 'post-loader', //添加post-loader加载器
                    ]
                },
                {
                    test: /\.svg$/i,
                    issuer: /\.[jt]sx?$/,
                    use: ['@svgr/webpack', 'url-loader']
                },
                {
                    test: /\.(png|jpg|gif|woff|woff2|eot|ttf|otf)$/i,
                    use: [
                        {
                            loader: 'url-loader',
                            options: {
                                limit: 8 * 1024, // 8kb
                                esModule: false,

                                fallback: {
                                    loader: 'file-loader',
                                    options: {
                                        name: buildProdMode ? '[hash:7].[ext]' : '[name].[ext]',

                                        outputPath: 'static/imgs'
                                    }
                                }
                            }
                        },
                        {
                            loader: 'image-webpack-loader',
                            options: {
                                mozjpeg: {
                                    progressive: true
                                },
                                // optipng.enabled: false will disable optipng
                                optipng: {
                                    enabled: true
                                },
                                pngquant: {
                                    quality: [0.65, 0.9],
                                    speed: 4
                                },
                                gifsicle: {
                                    interlaced: false
                                },
                                // the webp option will enable WEBP
                                webp: {
                                    quality: 75
                                }
                            }
                        }
                    ],
                    type: 'javascript/auto'
                }
            ]
        },

        plugins: [
            // new CopyWebpackPlugin({
            //     patterns: [
            //         {
            //             from: path.resolve(__dirname, '../assets/'),
            //             to: path.resolve(__dirname, '../dist/static/')
            //         }
            //     ]
            // }),
            new webpack.DefinePlugin({
                'process.env.route_prefix': JSON.stringify(process.env.route_prefix),
                'process.env.AES_KEY': JSON.stringify(process.env.AES_KEY),
                'process.env.AES_IV': JSON.stringify(process.env.AES_IV)
            }),
            new HtmlWebpackPlugin({
                template: path.resolve(__dirname, `../src/template/index.html`),
                title: '厚土综合系统',
                favicon: path.resolve(__dirname, `../src/template/ico.ico`)
            }),
            new MiniCssExtractPlugin({
                filename: 'static/css/[name].[contenthash].css',
                ignoreOrder: true
            }),
            new AntdDayjsWebpackPlugin(),
            new webpack.ProgressPlugin()
        ]
    };
};
