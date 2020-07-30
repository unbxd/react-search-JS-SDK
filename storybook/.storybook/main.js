const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  stories: ['../stories/**/*.stories.(js|mdx)'],
  addons: [
    {
      name: '@storybook/addon-docs',
      options: {
        configureJSX: true,
        babelOptions: {},
        sourceLoaderOptions: null
      }
    }
  ],
  webpackFinal: async (config) => {
    config.module.rules[0].include.push(path.resolve('../src'));

    config.module.rules.push({
      test: /\.s?css$/,
      loaders: [
        {
          loader: MiniCssExtractPlugin.loader
        },
        { loader: 'css-loader', options: { importLoaders: 1 } },
        {
          loader: 'postcss-loader',
          options: {
            ident: 'postcss',
            plugins: [require('tailwindcss'), require('autoprefixer')]
          }
        },
        require.resolve('sass-loader')
      ]
    });

    config.plugins.push(new MiniCssExtractPlugin());

    return config;
  }
};
