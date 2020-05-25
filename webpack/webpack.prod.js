const Path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const PurgecssPlugin = require('purgecss-webpack-plugin');
const glob = require('glob');
const path = require('path');

const PATHS = {
  src: path.join(__dirname, 'src')
};

module.exports = {
  entry: {
    //app: Path.resolve(__dirname, '../demo/index.js'),
    "unbxd-react-search-sdk": Path.resolve(__dirname, '../src/index.js')
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
    minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
    usedExports: true
  },
  plugins: [
    new MiniCssExtractPlugin({
      path: Path.resolve(__dirname, '../public'),
      filename: 'css/[name].css',
      chunkFilename: '[id].css'

    }),
    new PurgecssPlugin({
      paths: glob.sync(`${PATHS.src}/**/*`, { nodir: true }),
    }),
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
        use: [{
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
            plugins: ['@babel/plugin-proposal-private-methods', '@babel/plugin-proposal-class-properties']
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
            loader: MiniCssExtractPlugin.loader,
          },
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: [
                require('tailwindcss'),
                require('autoprefixer'),
              ],
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sassOptions: {
                includePaths: ['public/css']
              },
            }
          },
        ]
      }

    ]
  }
};
