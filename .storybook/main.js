const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  stories: ['../stories/**/*.stories.js'],
  addons: ['@storybook/addon-actions',
    '@storybook/addon-links',
    '@storybook/addon-storysource',
  ],
  webpackFinal: async config => {
    // `mode` has a value of 'DEVELOPMENT' or 'PRODUCTION'
    // You can change the configuration based on that.
    // 'PRODUCTION' is used when building the static version of storybook.

    config.module.rules.push({
      test: /\.s?css$/,
      loaders: [
        {
          loader: MiniCssExtractPlugin.loader,
        },
        { loader: 'css-loader', options: { importLoaders: 1 } },
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
        require.resolve('sass-loader')
      ]
    });

    config.plugins.push(new MiniCssExtractPlugin());

    return {
      ...config,
<<<<<<< HEAD
||||||| merged common ancestors
      module: {
        ...config.module, rules: custom.module.rules
      },
      plugins: [...config.plugins, ...custom.plugins]
=======
      module: {
        ...config.module, rules: [...custom.module.rules, {
          test: /\.stories\.js?$/,
          loaders: [require.resolve('@storybook/source-loader')],
          enforce: 'pre'
        }]
      },
      plugins: [...config.plugins, ...custom.plugins]
>>>>>>> setting up storybook with component description and prop table.
    };

  }
};
