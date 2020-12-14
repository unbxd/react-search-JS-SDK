import React from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

const { createSliderWithTooltip } = Slider;
const Range = createSliderWithTooltip(Slider.Range);
const RangeSlider = (props) => {
    const { min, max, value, handleAfterChange } = props;
    const tipFormatter = (value) => {
        return `$${value}`;
    };

    const marks = {
        [min]: <strong>${min}</strong>,
        [max]: <strong>${max}</strong>
    };

    return (
        <Range
            min={min}
            max={max}
            value={value}
            onChange={handleAfterChange}
            marks={marks}
            allowCross={false}
            tooltip
            tabIndex={value}
            pushable
            tipFormatter={tipFormatter}
        />
    );
};

export default RangeSlider;
