const postcssPresetEnv = require('postcss-preset-env');
const tailwindcss = require('tailwindcss');
const whiteListClasses = require('./src/config/whiteListClasses');

module.exports = {
    plugins: [
        tailwindcss('./tailwind.config.js'),
        require('autoprefixer')({ add: true, grid: true }),
        require('@fullhuman/postcss-purgecss')({
            content: ['./src/**/*.js'],
            defaultExtractor: (content) =>
                content.match(/[\w-/:]+(?<!:)/g) || [],
            whitelist: whiteListClasses,
        }),
    ],
};
