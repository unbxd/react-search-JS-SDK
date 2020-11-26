import React from 'react';
import PropTypes from 'prop-types';

import { getUpdatedRangeFacets } from './utils';
import { List, ViewMore } from '../../components';
import FacetItem from './FacetItem';
import { executeCallback } from '../../common/utils';

class GenerateFacets extends React.Component {
    constructor(props) {
        super(props);

        const { rangeFacets } = this.props;
        this.state = {
            rangeFacetsList: rangeFacets
        };
    }

    setFacetValue(facetObj, getResults = false) {
        const { onFacetClick, applyMultiple } = this.props;
        const { facetName, valMin, valMax, isSelected } = facetObj;

        const onFinish = () => {
            this.setState((existingState) => {
                const { rangeFacetsList } = existingState;
                const updatedRangeFacets = rangeFacetsList.map((rangeValue) => {
                    if (rangeValue.facetName === facetName) {
                        //also go into values and set the specific from to as is selected
                        let isFacetSelected = false;
                        const updatedValues = rangeValue.values.map(
                            (facetValue) => {
                                const { from, end } = facetValue;
                                const { dataId: fromValue } = from;
                                const { dataId: toValue } = end;

                                if (valMin >= fromValue && valMax <= toValue) {
                                    const { isSelected } = facetValue;
                                    if (!isSelected) {
                                        isFacetSelected = true;
                                    }
                                    return {
                                        ...facetValue,
                                        isSelected: !isSelected
                                    };
                                } else {
                                    const { isSelected } = facetValue;
                                    if (applyMultiple && isSelected) {
                                        isFacetSelected = true;
                                    }
                                    return {
                                        ...facetValue,
                                        isSelected: applyMultiple
                                            ? isSelected
                                            : false
                                    };
                                }
                            }
                        );

                        return {
                            ...rangeValue,
                            isSelected: isFacetSelected,
                            valMin,
                            valMax,
                            values: updatedValues
                        };
                    } else {
                        return { ...rangeValue };
                    }
                });

                return {
                    ...existingState,
                    rangeFacetsList: updatedRangeFacets
                };
            });

            const { addRangeFacet, removeRangeFacet } = this.props;
            if (isSelected && !applyMultiple) {
                removeRangeFacet({ facetName }, getResults);
            } else {
                addRangeFacet(
                    { facetName, start: valMin, end: valMax },
                    getResults
                );
            }
        };
        executeCallback(onFacetClick, [facetObj, !isSelected], onFinish);
    }

    onApplyFilter = () => {
        const { applyRangeFacet } = this.props;
        applyRangeFacet();
    };

    onClearFilter = (event) => {
        const facetName = event.target.dataset['unx_facetname'];
        const { applyMultiple } = this.props;

        const { removeRangeFacet, enableApplyFilters } = this.props;
        removeRangeFacet({ facetName }, !enableApplyFilters);
        this.setState((currentFacetState) => {
            const { rangeFacetsList } = currentFacetState;
            const updatedRangeFacets = rangeFacetsList.map((rangeValue) => {
                if (rangeValue.facetName === facetName) {
                    const updatedValues = rangeValue.values.map(
                        (facetValue) => {
                            return { ...facetValue, isSelected: false };
                        }
                    );
                    return {
                        ...rangeValue,
                        isSelected: false,
                        valMin: rangeValue.sliderMin,
                        valMax: rangeValue.sliderMax,
                        values: updatedValues
                    };
                } else {
                    return { ...rangeValue };
                }
            });

            return {
                ...currentFacetState,
                rangeFacetsList: updatedRangeFacets
            };
        });

        !applyMultiple && this.onApplyFilter();
    };

    handleFacetClick = (currentItem) => {
        const { from, end, facetName, isSelected = false } = currentItem;
        const { dataId: valMin } = from;
        const { dataId: valMax } = end;

        const { enableApplyFilters } = this.props;
        const facetObj = { facetName, valMin, valMax, isSelected };
        this.setFacetValue(facetObj, !enableApplyFilters);
    };

    handleCollapseToggle = (event) => {
        const facetName = event.target.dataset['unx_name'];
        this.setState((existingState) => {
            const { rangeFacetsList } = existingState;

            const updatedRangeValues = rangeFacetsList.map((rangeValue) => {
                if (rangeValue.facetName === facetName) {
                    return {
                        ...rangeValue,
                        isOpen: !rangeValue.isOpen
                    };
                } else {
                    return { ...rangeValue };
                }
            });

            return {
                ...existingState,
                rangeFacetsList: updatedRangeValues
            };
        });
    };

    componentDidUpdate(prevProps) {
        const { rangeFacets, transform } = this.props;
        if (prevProps.rangeFacets !== rangeFacets) {
            this.setState((existingState) => {
                const { rangeFacetsList } = existingState;
                const updatedFacetState = getUpdatedRangeFacets(
                    rangeFacets,
                    rangeFacetsList
                );

                if (transform && typeof transform === 'function') {
                    let returnedFacets = transform.call(updatedFacetState);
                    return { rangeFacetsList: returnedFacets };
                }
                return { rangeFacetsList: updatedFacetState };
            });
        }
    }

    toggleViewLess = (event) => {
        const facetName = event.target.dataset['unx_name'];
        this.setState((existingState) => {
            const { rangeFacetsList } = existingState;
            const updatedRangeFacets = rangeFacetsList.map((rangeValue) => {
                if (rangeValue.facetName === facetName) {
                    return {
                        ...rangeValue,
                        viewLess: !rangeValue.viewLess
                    };
                } else {
                    return { ...rangeValue };
                }
            });

            return {
                ...existingState,
                rangeFacetsList: updatedRangeFacets
            };
        });
    };

    render() {
        const { rangeFacetsList } = this.state;
        const {
            facetItemComponent,
            priceUnit,
            label,
            collapsible,
            enableViewMore,
            minViewMore
        } = this.props;

        if (rangeFacetsList.length === 0) {
            return null;
        }

        return (
            <div className="UNX-rangefacet__container">
                {label ? label : null}

                {rangeFacetsList.map((facetObj) => {
                    const {
                        facetName,
                        values,
                        displayName,
                        isSelected,
                        isOpen = true,
                        viewLess
                    } = facetObj;

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
                                            onClick={this.handleCollapseToggle}
                                        />
                                    )}
                                </div>
                            </div>
                            <List
                                items={values}
                                ListItem={facetItemComponent || FacetItem}
                                onClick={this.handleFacetClick}
                                className={`UNX-facet__list ${
                                    viewLess ? 'UNX-facet__listShowLimited' : ''
                                }`}
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
                            {enableViewMore &&
                            isOpen &&
                            values.length > minViewMore ? (
                                <ViewMore
                                    facetName={facetName}
                                    toggleViewLess={this.toggleViewLess}
                                    viewLess={viewLess}
                                />
                            ) : null}
                        </div>
                    );
                })}
            </div>
        );
    }
}

GenerateFacets.propTypes = {
    rangeFacets: PropTypes.array,
    enableApplyFilters: PropTypes.bool.isRequired,
    addRangeFacet: PropTypes.func.isRequired,
    applyRangeFacet: PropTypes.func.isRequired,
    removeRangeFacet: PropTypes.func.isRequired,
    facetItemComponent: PropTypes.element,
    priceUnit: PropTypes.string.isRequired,
    label: PropTypes.node,
    collapsible: PropTypes.bool,
    applyMultiple: PropTypes.bool
};

export default GenerateFacets;
