export const getPercentage = (current, max) => (100 * current) / max;

export const getLeftPercent = (percentage, sliderWidth) => {

    let sliderWidthHalf = (sliderWidth / 2);
    return `calc(${percentage}% - ${sliderWidthHalf}px)`
};

export const getCalculatedValue = (percentage, sliderMin, sliderMax) => (parseInt((percentage * (sliderMax - sliderMin) / 100) + sliderMin));

export const getCalculatedPercentage = (value, sliderMin, sliderMax) => (((value - sliderMin) / (sliderMax - sliderMin)) * 100);

export const getPercentMoved = (styleString) => (styleString.match(/\(([^)]+)\)/)[1].split("%")[0])
