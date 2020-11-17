import React from 'react';
import { Range, SliderTooltip } from 'rc-slider';
import 'rc-slider/assets/index.css';
import {debounce} from './RangeFacetsUtils'


const RangeSlider = (props) => {

  return (
      <Range
        min={props.min}
        max={props.max}
        value={props.value}
        data-unx_name={props.facetName}
        onChange={(event)=>{
          debounce(props.handleAfterChange(event,props.facetObj), 10)
        }}
        allowCross={false}
        tabIndex={props.value}
        pushable={true}
      />
  );
}

export default RangeSlider