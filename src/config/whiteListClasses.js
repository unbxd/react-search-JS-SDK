// implemented commonJs export because this file is used for css builds./
// usage - postcss.config.js

const whiteListClasses = [];

const gridCols = [...Array(13).keys()]
    .slice(1)
    .map((item) => `grid-cols-${item}`);
whiteListClasses.push(...gridCols);

module.exports = whiteListClasses;
