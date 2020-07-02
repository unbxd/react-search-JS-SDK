import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import { RangeSlider } from '../../../../components';
import { getSelectedRangeFacets, getMinMax } from '../../utils';

class GenerateFacets extends React.Component {

    state = {
        rangeValues: {},
        rangeFacets: []
    };


    onSliderChange = (selectedRange) => {

        const name = selectedRange.name;
        const valMin = parseInt(selectedRange.valMin);
        const valMax = parseInt(selectedRange.valMax);

        const { addRangeFacet, trackActions } = this.props;

        const addFacetObj = { facetName: name, start: valMin, end: valMax };
        addRangeFacet(addFacetObj);
        trackActions({ type: "RANGE_FACETS_ADD", data: addFacetObj });

        const rangeObject = this.state.rangeValues[name];
        this.setState({
            rangeValues: {
                ...this.state.rangeValues,
                [name]: { ...rangeObject, valMin: valMin, valMax: valMax }
            }
        });
    }

    onApplyFilter = (event) => {

        const { applyRangeFacet, trackActions } = this.props;
        applyRangeFacet();
        trackActions({ type: "RANGE_FACETS_APPLY" });
    }

    onClearFilter = (event) => {

        const facetName = event.target.dataset['unx_facetname'];

        const { removeRangeFacet } = this.props;
        removeRangeFacet({facetName});

        const { [facetName]: currentFacet, ...otherFacets } = this.state.rangeValues;
        this.setState({
            rangeValues:
            {
                ...otherFacets,
                [facetName]: {
                    ...currentFacet,
                    valMin: currentFacet.sliderMin,
                    valMax: currentFacet.sliderMax
                }
            }
        });

        this.onApplyFilter();
    }

    static getDerivedStateFromProps(props, state) {
        
        if (props.rangeFacets !== state.rangeFacets) {

            let selectedRangeFacets = {};
            if (Object.keys(props.selectedRangeFacets).length) {
                selectedRangeFacets = getSelectedRangeFacets(props.selectedRangeFacets);
            }

            //set the state with starts and ends
            const { rangeFacets, } = props;
            const initialState = {};

            rangeFacets.map((facet) => {

                const { sliderMin, sliderMax, facetName, displayName } = getMinMax(facet);

                if (selectedRangeFacets[facetName]) {

                    const valMin = parseInt(selectedRangeFacets[facetName]['valMin']);
                    const valMax = parseInt(selectedRangeFacets[facetName]['valMax']);

                    initialState[facetName] = { sliderMin, sliderMax, valMin, valMax, displayName };
                } else {
                    initialState[facetName] = { sliderMin, sliderMax, valMin: sliderMin, valMax: sliderMax, displayName };
                }

            });

            return { rangeValues: initialState, rangeFacets: props.rangeFacets };
        }
        return null;

    }

    render() {

        const { rangeValues } = this.state;

        return (
            <Fragment>
                {Object.keys(rangeValues).map((facetName) => {

                    const { sliderMin, sliderMax, valMin, valMax, displayName } = rangeValues[facetName];

                    return (<div className='UNX-range-facet-item'>
                        <div className='UNX-range-facet-item header'>{displayName}</div>
                        <RangeSlider
                            unit='$'
                            name={facetName}
                            sliderMin={sliderMin}
                            sliderMax={sliderMax}
                            valMin={valMin}
                            valMax={valMax}
                            onChange={this.onSliderChange}
                        />
                        <div className='UNX-range-facet-actions'>
                            <div className='UNX-range-facet-action clear' data-unx_facetname={facetName} onClick={this.onClearFilter}>Clear</div>
                            <div className='UNX-range-facet-action apply' data-unx_facetname={facetName} onClick={this.onApplyFilter}>Apply</div>
                        </div>
                    </div>)
                })}

            </Fragment>)
    }
}

export default GenerateFacets;
