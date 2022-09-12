const Path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');

const htmlPlugin = new HtmlWebPackPlugin({
    template: Path.resolve(__dirname, '../public/index.html'),
    filename: 'index.html'
});

const miniCssExtractPlugin = new MiniCssExtractPlugin({
    path: Path.resolve(__dirname, '../public/dist'),
    filename: 'css/[name].css',
    chunkFilename: '[id].css'
});


module.exports = {
    entry: Path.resolve(__dirname, '../src/index.js'),
    output: {
        path: Path.resolve(__dirname, '../public/dist'),
        publicPath: '/',
        filename: 'js/[name].js',
        sourceMapFilename: '[file].map'
    },
    mode: 'production',
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
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
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
    plugins: [ miniCssExtractPlugin, htmlPlugin],
    optimization: {
        minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})]
    },
    resolve: {
        extensions: ['*', '.js', '.jsx'],
        alias: {
            '~': Path.resolve(__dirname, '../src')
        }
    }
};
