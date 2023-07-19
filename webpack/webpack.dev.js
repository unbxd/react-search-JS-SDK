const Path = require('path');
const webpack = require('webpack');
const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        app: Path.resolve(__dirname, '../demo/src/index.js'),
        reactSearch: Path.resolve(__dirname, '../src/index.js')
    },
    mode: 'development',
    devtool: 'inline-source-map',
    target: 'web',
    watch: true,
    output: {
        path: Path.join(__dirname, '../public'),
        filename: 'js/[name].js',
        sourceMapFilename: '[file].map'
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'common',
                    chunks: 'all'
                }
            }
        },
        minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
        usedExports: true
    },
    plugins: [
        new webpack.LoaderOptionsPlugin({
            debug: true
        }),
        new MiniCssExtractPlugin({
            filename: 'css/[name].css',
            chunkFilename: '[id].css'
        }),
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            template: Path.resolve(__dirname, '../demo/public/index.html'),
            chunks: ['common', 'app'],
            path: Path.resolve(__dirname, '../public'),
            filename: 'index.html'
        })
    ],
    resolve: {
        alias: {
            '~': Path.resolve(__dirname, '../src')
        },
        modules: [
            "node_modules"
        ],
        extensions: ['*', '.js', '.jsx', '.css'],
    },
    devServer: {
        static: {
            directory: Path.join(__dirname, '../demo')
            
        },
        port: 7878
        // static: Path.join(__dirname, '../demo'),
        
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                '@babel/preset-env',
                                '@babel/preset-react'
                            ],
                            plugins: [
                                '@babel/plugin-proposal-private-methods',
                                '@babel/plugin-proposal-class-properties'
                            ]
                        }
                    }
                ]
            },
            {
                test: /\.html$/,
                loader: 'html-loader'
            },
            {
                test: /\.s?css$/,
                use: [
                    'style-loader',
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                ident: 'postcss',
                                plugins: [
                                    require('tailwindcss'),
                                    require('autoprefixer')
                                ]
                            },
                            // ident: 'postcss',
                            // plugins: [
                            //     require('tailwindcss'),
                            //     require('autoprefixer')
                            // ]
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sassOptions: {
                                includePaths: ['public/css']
                            }
                        }
                    }
                ]
            }
        ]
    }
};
