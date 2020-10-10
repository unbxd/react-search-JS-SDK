const tailwindcss = require('tailwindcss');
const whiteListClasses = require('./src/config/whiteListClasses');

module.exports = {
    plugins: [
        tailwindcss('./tailwind.config.js'),
        require('autoprefixer'),
        require('@fullhuman/postcss-purgecss')({
            content: ['./src/**/*.js'],
            defaultExtractor: (content) =>
                content.match(/[\w-/:]+(?<!:)/g) || [],
            whitelist: whiteListClasses,
        }),
    ],
};
