import React from 'react';
import PropTypes from 'prop-types';

import { RangeSlider } from '../../components';
import {
    getSelectedRangeFacets,
    displayTypes,
    isFacetSelected,
    getUpdatedFacets,
} from './utils';
import { List } from '../../components';
import FacetListItem from './FacetListItem';

class GenerateFacets extends React.Component {
    constructor(props) {
        super(props);

        const { rangeFacets, selectedRangeFacets } = this.props;
        const updatedFacetState = getUpdatedFacets(
            rangeFacets,
            selectedRangeFacets
        );

        this.state = {
            rangeValues: updatedFacetState,
        };
    }

    setFacetValue(facetAddObj, getResults = false) {
        const { facetName, valMin, valMax } = facetAddObj;
        const { displayType } = this.props;
        const applyMutiple = displayType === displayTypes.LIST;
        const isSelected = isFacetSelected(facetAddObj, this.state.rangeValues);
        this.setState((currentFacetState) => {
            const rangeObject = currentFacetState.rangeValues[facetName];
            //also go into values and set the specific from to as is selected
            const updatedValues = rangeObject.values.map((rangeValues) => {
                const { from, end, isSelected = false } = rangeValues;
                const { dataId: fromValue } = from;
                const { dataId: toValue } = end;

                if (valMin >= fromValue && valMax <= toValue) {
                    return { ...rangeValues, isSelected: !isSelected };
                } else {
                    return { ...rangeValues };
                }
            });

            return {
                rangeValues: {
                    ...currentFacetState.rangeValues,
                    [facetName]: {
                        ...rangeObject,
                        valMin,
                        valMax,
                        values: updatedValues,
                    },
                },
            };
        });

        const { addRangeFacet, removeRangeFacet } = this.props;
        if (isSelected && !applyMutiple) {
            removeRangeFacet({ facetName }, getResults);
        } else {
            addRangeFacet(
                { facetName, start: valMin, end: valMax },
                getResults
            );
        }
    }

    onSliderChange = (selectedRange) => {
        const facetName = selectedRange.name;
        const valMin = parseInt(selectedRange.valMin);
        const valMax = parseInt(selectedRange.valMax);

        const addFacetObj = { facetName, valMin, valMax };
        this.setFacetValue(addFacetObj);
    };

    onApplyFilter = () => {
        const { applyRangeFacet } = this.props;
        applyRangeFacet();
    };

    onClearFilter = (event) => {
        const facetName = event.target.dataset['unx_facetname'];

        const { removeRangeFacet } = this.props;
        removeRangeFacet({ facetName });

        const {
            [facetName]: currentFacet,
            ...otherFacets
        } = this.state.rangeValues;
        this.setState({
            rangeValues: {
                ...otherFacets,
                [facetName]: {
                    ...currentFacet,
                    valMin: currentFacet.sliderMin,
                    valMax: currentFacet.sliderMax,
                },
            },
        });

        this.onApplyFilter();
    };

    handleRangeValueClick = (event) => {
        const facetInfo = event.target.dataset['unx_facetname'];
        const [facetName, ranges] = facetInfo.split('_');
        const [valMin, valMax] = ranges.split('-');

        const { enableApplyFilters } = this.props;
        this.setFacetValue({ facetName, valMin, valMax }, !enableApplyFilters);
    };

    handleCollapseToggle = (event) => {
        const facetId = event.target.dataset['unx_name'];
        this.setState((existingState) => {
            const currentFacet = existingState.rangeValues[facetId];
            return {
                ...existingState,
                rangeValues: {
                    ...existingState.rangeValues,
                    [facetId]: {
                        ...currentFacet,
                        isOpen: !currentFacet.isOpen,
                    },
                },
            };
        });
    };

    componentDidUpdate(prevProps) {
        const { rangeFacets, selectedRangeFacets, sortRangeFacets } = this.props;
        if (prevProps.rangeFacets !== rangeFacets) {
            this.setState((existingState) => {
                //set the state with starts and ends
                const updatedFacetState = getUpdatedFacets(
                    rangeFacets,
                    selectedRangeFacets,
                    existingState
                );

                if(sortRangeFacets && typeof(sortRangeFacets) === 'function'){
                    let returnedFacets = sortRangeFacets.call(updatedFacetState);
                    return { rangeValues: returnedFacets };
                  }
                return { rangeValues: updatedFacetState };
            });
        }
    }

    toggleViewLess = (event) =>{
        const facetName = event.target.dataset['unx_name'];
        
        this.setState((existingState) => {
            const currentFacet = existingState.rangeValues[facetName];
            let classNameTemp = currentFacet.className;
            classNameTemp = (classNameTemp.indexOf("UNX-facet__listShowLimited") < 0)?"UNX-facet__list UNX-facet__listShowLimited": "UNX-facet__list"
            return {
                ...existingState,
                rangeValues: {
                    ...existingState.rangeValues,
                    [facetName]: {
                        ...currentFacet,
                        className: classNameTemp,
                        viewLess: !currentFacet.viewLess,
                    },
                },
            };
        });
    }

    render() {
        const { rangeValues } = this.state;
        const {
            FacetSliderItemComponent,
            FacetListItemComponent,
            displayType,
            priceUnit,
            label,
            collapsible,
        } = this.props;

        if (Object.keys(rangeValues).length === 0) {
            return null;
        }

        return (
            <div className="UNX-rangefacet__container">
                {label ? label : null}
                {displayType === displayTypes.SLIDER &&
                    Object.keys(rangeValues).map((facetName) => {
                        const {
                            sliderMin,
                            sliderMax,
                            valMin,
                            valMax,
                            displayName,
                            isOpen = true,
                        } = rangeValues[facetName];

                        return FacetSliderItemComponent ? (
                            <FacetSliderItemComponent
                                sliderMin={sliderMin}
                                sliderMax={sliderMax}
                                valMin={valMin}
                                valMax={valMax}
                                onChange={this.onSliderChange}
                                onClearFilter={this.onClearFilter}
                                onApplyFilter={this.onApplyFilter}
                                displayName={displayName}
                                key={facetName}
                            />
                        ) : (
                            <div
                                className={`UNX-facet__element ${
                                    isOpen ? 'open' : ''
                                }`}
                                key={facetName}
                            >
                                <div className="UNX-facet__header">
                                    {displayName}
                                    {collapsible && (
                                        <span
                                            className="-collapse-icon"
                                            data-unx_name={facetName}
                                            onClick={this.handleCollapseToggle}
                                        />
                                    )}
                                </div>
                                <RangeSlider
                                    unit={priceUnit}
                                    name={facetName}
                                    sliderMin={sliderMin}
                                    sliderMax={sliderMax}
                                    valMin={valMin}
                                    valMax={valMax}
                                    onChange={this.onSliderChange}
                                />
                                <div className="UNX-facet__actions">
                                    <div
                                        className="-clear"
                                        data-unx_facetname={facetName}
                                        onClick={this.onClearFilter}
                                    >
                                        Clear
                                    </div>
                                    <div
                                        className="-apply"
                                        data-unx_facetname={facetName}
                                        onClick={this.onApplyFilter}
                                    >
                                        Apply
                                    </div>
                                </div>
                            </div>
                        );
                    })}

                {displayType === displayTypes.LIST &&
                    Object.keys(rangeValues).map((facetName) => {
                        const {
                            values,
                            displayName,
                            isSelected,
                            isOpen = true,
                            viewLess,
                            className
                        } = rangeValues[facetName];

                        return (
                            <div
                                className={`UNX-facet__element ${
                                    isOpen ? 'open' : ''
                                }`}
                                key={facetName}
                            >
                                <div className="UNX-facet__headerContainer">
                                    <div className="UNX-facet__header">
                                        {displayName}
                                        {collapsible && (
                                            <span
                                                className="-collapse-icon"
                                                data-unx_name={facetName}
                                                onClick={
                                                    this.handleCollapseToggle
                                                }
                                            />
                                        )}
                                    </div>
                                </div>
                                <List
                                    items={values}
                                    ListItem={
                                        FacetListItemComponent || FacetListItem
                                    }
                                    onClick={this.handleRangeValueClick}
                                    idAttribute={facetName}
                                    facetName={facetName}
                                    className={className}
                                    priceUnit={priceUnit}
                                />
                                {isSelected && (
                                    <div
                                        onClick={this.onClearFilter}
                                        data-unx_facetname={facetName}
                                        className="-clear"
                                    >
                                        Clear
                                    </div>
                                )}
                                {isOpen?
                                    (!viewLess) ? (
                                    <div className="view-More"
                                        data-unx_name={facetName}
                                        onClick={this.toggleViewLess}>
                                        View Less
                                    </div>
                                    ):(
                                    <div 
                                        className="view-More"
                                        data-unx_name={facetName}
                                        onClick={this.toggleViewLess}>
                                        View More
                                    </div>
                                    ): ""
                                }
                            </div>
                        );
                    })}
            </div>
        );
    }
}

GenerateFacets.propTypes = {
    displayType: PropTypes.string,
    rangeFacets: PropTypes.array,
    selectedRangeFacets: PropTypes.object,
    enableApplyFilters: PropTypes.bool.isRequired,
    addRangeFacet: PropTypes.func.isRequired,
    applyRangeFacet: PropTypes.func.isRequired,
    removeRangeFacet: PropTypes.func.isRequired,
    FacetSliderItemComponent: PropTypes.oneOfType([
        PropTypes.element,
        PropTypes.func,
    ]),
    FacetListItemComponent: PropTypes.oneOfType([
        PropTypes.element,
        PropTypes.func,
    ]),
    priceUnit: PropTypes.string.isRequired,
    label: PropTypes.node,
    collapsible: PropTypes.bool,
};

export default GenerateFacets;
