const Path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
//const CompressionPlugin = require('compression-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: {
        app: Path.resolve(__dirname, '../demo/index.js'),
        unbxdSdk: Path.resolve(__dirname, '../src/index.js')
    },
    mode: 'production',
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
                    name: "common",
                    chunks: "all"
                }
            }
        },
        minimizer: [
          new UglifyJsPlugin()
        ]
  },
  plugins: [
        new MiniCssExtractPlugin({
          path: Path.resolve(__dirname, '../public'),
          filename: '[name].css',
          chunkFilename: '[id].css'

        }),
        new HtmlWebpackPlugin({
            template:Path.resolve(__dirname, '../demo/index.html'),
            chunks: ['common', 'app'],
            path: Path.resolve(__dirname, '../public'),
            filename: "index.html"
        })
    ],
  resolve: {
    alias: {
      '~': Path.resolve(__dirname, '../src')
    }
  },
  module: {
    rules: [
        {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: {
              loader: "babel-loader"
            }
        },
        {
          test: /\.html$/,
          loader: 'html-loader'
        },
        {
          rules: [
            {
              test: /\.s?css$/,
              use: [
                MiniCssExtractPlugin.loader,
                'css-loader',
                'sass-loader'
              ]
            }
          ]

        }
        
    ]
  }
};