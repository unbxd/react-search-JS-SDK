import React, { createRef, Fragment } from 'react';
import PropTypes from 'prop-types';


import { getLeftPercent, getPercentage, getCalculatedValue, getCalculatedPercentage, getPercentMoved } from './utils';

class RangeSlider extends React.PureComponent {

    constructor(props) {
        super(props);

        this.sliderRef = createRef();

        this.thumbRefMin = createRef();
        this.thumbRefMax = createRef();

        this.diff = createRef();

        this.valMinRef = createRef();
        this.valMaxRef = createRef();

        this.activeThumbRef = null;

        this.activeTrackRef = createRef();

        const { sliderMin, sliderMax, valMin, valMax } = this.props;
        this.state = {
            sliderWidth: null,
            sliderMin,
            sliderMax,
            valMin,
            valMax
        };
    }

    handleMouseUp = () => {

        const { onChange, name, sliderMax, sliderMin } = this.props;

        document.removeEventListener('mouseup', this.handleMouseUp);
        document.removeEventListener('mousemove', this.handleMouseMove);

        const valMin = getCalculatedValue(getPercentMoved(this.thumbRefMin.current.style.left), sliderMin, sliderMax);
        const valMax = getCalculatedValue(getPercentMoved(this.thumbRefMax.current.style.left), sliderMin, sliderMax);
        const updatedRange = { valMin, valMax, name };

        this.setState(updatedRange);
        onChange && onChange(updatedRange);
    };

    handleMouseDown = event => {

        this.activeThumbRef = event.target.dataset['unx_thumb_type'] === 'valMax' ? this.thumbRefMax : this.thumbRefMin;
        this.diff.current =
            event.clientX - this.activeThumbRef.current.getBoundingClientRect().left;

        document.addEventListener('mousemove', this.handleMouseMove);
        document.addEventListener('mouseup', this.handleMouseUp);
    };

    handleMouseMove = event => {

        const { sliderMin, sliderMax, valMin, valMax } = this.state;

        let movedX =
            event.clientX -
            this.diff.current -
            this.sliderRef.current.getBoundingClientRect().left;

        const end = this.sliderRef.current.offsetWidth - this.activeThumbRef.current.offsetWidth;
        const start = 0;


        if (movedX < start) {
            movedX = 0;
        }

        if (movedX > end) {
            movedX = end;
        }

        const movedPercentage = getPercentage(movedX, end) > 100 ?
            100 : getPercentage(movedX, end);
        const movedValue = getCalculatedValue(movedPercentage, sliderMin, sliderMax);

        //validations for thumbs not crossing each other
        const currentDataVal = this.activeThumbRef.current.getAttribute('data-unx_thumb_type');
        if (currentDataVal === 'valMin' &&
            valMax <= movedValue) {
            return
        }

        if (currentDataVal === 'valMax' &&
            valMin >= movedValue) {
            return
        }

        const sliderWidth = this.activeThumbRef.current.clientWidth;
        this.activeThumbRef.current.style.left = getLeftPercent(movedPercentage, sliderWidth);
        this.activeThumbRef.current.getAttribute('data-unx_thumb_type') === 'valMin' ?
            this.valMinRef.current.textContent = movedValue : this.valMaxRef.current.textContent = movedValue;

        const valMinTemp = this.valMinRef.current.textContent;
        const valMaxTemp = this.valMaxRef.current.textContent;

        this.updateActiveTrack({
            sliderMin,
            sliderMax,
            valMin: valMinTemp,
            valMax: valMaxTemp,
        });
    }

    updateActiveTrack = ({ sliderMin,
        sliderMax,
        valMin,
        valMax,
    }) => {

        const { sliderWidth } = this.state;
        const valMinPercent = getCalculatedPercentage(valMin, sliderMin, sliderMax);
        const valMaxPercent = getCalculatedPercentage(valMax, sliderMin, sliderMax);

        this.thumbRefMin.current.style.left = getLeftPercent(valMinPercent, sliderWidth);
        this.thumbRefMax.current.style.left = getLeftPercent(valMaxPercent, sliderWidth);

        this.activeTrackRef.current.style.left = `${valMinPercent}%`;
        this.activeTrackRef.current.style.width = `${valMaxPercent - valMinPercent}%`;


    }

    componentDidMount() {

        //set the width of slider thumb
        this.setState({ sliderWidth: this.thumbRefMin.current.clientWidth });

        const { sliderMin,
            sliderMax,
            valMin,
            valMax,
        } = this.props

        //fill active track with the percentages from values
        this.updateActiveTrack({
            sliderMin,
            sliderMax,
            valMin,
            valMax,
        });
    }

    static getDerivedStateFromProps(props, state) {

        if (props.valMin !== state.valMin || props.valMax !== state.valMax) {

            const { sliderMin, sliderMax, valMin, valMax } = props;
            return { sliderMin, sliderMax, valMin, valMax }
        }

        return null;
    }

    componentDidUpdate(props) {
        const { sliderMin, sliderMax, valMin, valMax } = this.state;
        //fill active track with the percentages from values
        this.updateActiveTrack({
            sliderMin,
            sliderMax,
            valMin,
            valMax,
        });
    }


    render() {


        const { sliderWidth, valMin, valMax } = this.state;
        const { unit = '' } = this.props;

        return (<div className='UNX-slider-container'>
            <div className='UNX-slider-track-container'
                ref={this.sliderRef}
                onMouseDown={this.handleEvent}
                onMouseUp={this.handleEvent}
                onMouseMove={this.handleEvent}
            >
                <div
                    ref={this.activeTrackRef}
                    className='UNX-slider-active-track'
                />

                <div
                    ref={this.thumbRefMin}
                    data-unx_thumb_type={'valMin'}
                    style={{ left: getLeftPercent(0, sliderWidth) }}
                    onMouseDown={this.handleMouseDown}
                    className='UNX-slider-thumb-min'
                />

                <div
                    ref={this.thumbRefMax}
                    data-unx_thumb_type={'valMax'}
                    style={{ left: getLeftPercent(100, sliderWidth) }}
                    onMouseDown={this.handleMouseDown}
                    className='UNX-slider-thumb-max'
                />
            </div>
            <div className='UNX-slider-ranges-text-container'>
                <span className='UNX-slider-range-min-text-container'>
                    {unit}
                    <span className='UNX-slider-range-min-text' ref={this.valMinRef}>
                        {valMin}
                    </span>
                </span>

                <span className='UNX-slider-range-max-text-container'>
                    {unit}
                    <span className='UNX-slider-range-min-text' ref={this.valMaxRef}>
                        {valMax}
                    </span>
                </span>
            </div>
        </div >)
    }
}

RangeSlider.propTypes = {
    sliderMin: PropTypes.number.isRequired,
    sliderMax: PropTypes.number.isRequired,
    valMin: PropTypes.number.isRequired,
    valMax: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired
}

export default RangeSlider;
