const tailwindcss = require('tailwindcss');
const whiteListClasses = require('./src/config/whiteListClasses');
const purgecss = require('@fullhuman/postcss-purgecss')

module.exports = {
    plugins: [
        tailwindcss('./tailwind.config.js'),
        require('autoprefixer')
        // purgecss({
        //     content: ["./src/**/*.js", "./demo/src/**/*.js"],
        //     css: ["./public/css/**/*.css"],
        //     defaultExtractor: content => content.match(/[\w-./:]+(?<!:)/g) || [],
        //     safelist: whiteListClasses
        //   }),
    ]
};
