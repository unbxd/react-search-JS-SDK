const Path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: {
    app: Path.resolve(__dirname, '../demo/index.js'),
    unbxdSdk: Path.resolve(__dirname, '../src/index.js')
  },
  mode:'development',
  devtool: 'inline-source-map',
  target: "web",
  watch:true,
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
            chunks: "all"}
      }
  }
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      debug: true
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css'
    }),
    new webpack.HotModuleReplacementPlugin(),
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
  devServer: {
    contentBase: Path.join(__dirname, '../src'),
    port: 7000,
    watchContentBase: true
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
          test: /\.s?css$/,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            'sass-loader'
          ]
        }
    ]
  }
};