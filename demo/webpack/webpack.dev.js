const Path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');

const htmlPlugin = new HtmlWebPackPlugin({
    template: Path.resolve(__dirname, '../public/index.html'),
    filename: 'index.html'
});

module.exports = {
    entry: Path.resolve(__dirname, '../src/index.js'),
    output: {
        path: Path.resolve('dist'),
        publicPath: '/',
        filename: 'js/[name].js',
        sourceMapFilename: '[file].map'
    },
    mode: 'development',
    devtool: 'inline-source-map',
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
                                '@babel/plugin-transform-runtime',
                                '@babel/plugin-proposal-class-properties',
                                'transform-class-properties'
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
    },
    plugins: [htmlPlugin],
    resolve: {
        extensions: ['*', '.js', '.jsx', '.scss', '.css'],
        modules: [
            "node_modules"
        ],
        alias: {
            '~': Path.resolve(__dirname, '../src')
        }
    },
    devServer: {
        static: {
            directory: './dist',
        },
        //contentBase: './dist',
        open: false,
        hot: true,
        port: 6969,
        historyApiFallback: true
    }
};
