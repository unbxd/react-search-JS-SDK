const custom = require('../webpack/webpack.dev');

module.exports = {
  stories: ['../stories/**/*.stories.js'],
  addons: ['@storybook/addon-actions', '@storybook/addon-links'],
  webpackFinal: async config => {
    // `mode` has a value of 'DEVELOPMENT' or 'PRODUCTION'
    // You can change the configuration based on that.
    // 'PRODUCTION' is used when building the static version of storybook.

    return {
      ...config,
      module: {
        ...config.module, rules: custom.module.rules
      },
      plugins: [...config.plugins, ...custom.plugins]
    };

  }
};
