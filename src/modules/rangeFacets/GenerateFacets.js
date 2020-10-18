import React from 'react';
import PropTypes from 'prop-types';

import { isFacetSelected, getUpdatedFacets } from './utils';
import { List } from '../../components';
import FacetListItem from './FacetListItem';
import { executeCallback } from '../../common/utils';

class GenerateFacets extends React.Component {
    constructor(props) {
        super(props);

        const { rangeFacets } = this.props;
        this.state = {
            rangeValues: rangeFacets,
        };
    }

    setFacetValue(facetObj, getResults = false) {
        const { onFacetClick } = this.props;
        const { facetName, valMin, valMax } = facetObj;
        const applyMutiple = true;
        const isSelected = isFacetSelected(facetObj, this.state.rangeValues);
        const onFinish = () => {
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
        };
        executeCallback(onFacetClick, [facetObj, !isSelected], onFinish);
    }

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

    handleFacetClick = (event) => {
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
                        isOpen:
                            currentFacet.isOpen === undefined
                                ? false
                                : !currentFacet.isOpen,
                    },
                },
            };
        });
    };

    componentDidUpdate(prevProps) {
        const { rangeFacets, sortRangeFacets } = this.props;
        if (prevProps.rangeFacets !== rangeFacets) {
            this.setState((existingState) => {
                const { rangeValues } = existingState;
                const updatedFacetState = getUpdatedFacets(
                    rangeFacets,
                    rangeValues
                );

                if (sortRangeFacets && typeof sortRangeFacets === 'function') {
                    let returnedFacets = sortRangeFacets.call(
                        updatedFacetState
                    );
                    return { rangeValues: returnedFacets };
                }
                return { rangeValues: updatedFacetState };
            });
        }
    }

    toggleViewLess = (event) => {
        const facetName = event.target.dataset['unx_name'];
        this.setState((existingState) => {
            const currentFacet = existingState.rangeValues[facetName];
            let classNameTemp = currentFacet.className;
            classNameTemp =
                classNameTemp.indexOf('UNX-facet__listShowLimited') < 0
                    ? 'UNX-facet__list UNX-facet__listShowLimited'
                    : 'UNX-facet__list';
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
    };

    render() {
        const { rangeValues } = this.state;
        const {
            FacetListItemComponent,
            priceUnit,
            label,
            collapsible,
            enableViewMore,
        } = this.props;

        if (Object.keys(rangeValues).length === 0) {
            return null;
        }

        return (
            <div className="UNX-rangefacet__container">
                {label ? label : null}

                {Object.keys(rangeValues).map((facetName) => {
                    const {
                        values,
                        displayName,
                        isSelected,
                        isOpen = true,
                        viewLess,
                        className,
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
                                            onClick={this.handleCollapseToggle}
                                        />
                                    )}
                                </div>
                            </div>
                            <List
                                items={values}
                                ListItem={
                                    FacetListItemComponent || FacetListItem
                                }
                                onClick={this.handleFacetClick}
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
                            {enableViewMore && isOpen ? (
                                !viewLess ? (
                                    <div
                                        className="view-More"
                                        data-unx_name={facetName}
                                        onClick={this.toggleViewLess}
                                    >
                                        View Less
                                    </div>
                                ) : (
                                    <div
                                        className="view-More"
                                        data-unx_name={facetName}
                                        onClick={this.toggleViewLess}
                                    >
                                        View More
                                    </div>
                                )
                            ) : (
                                ''
                            )}
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
    FacetListItemComponent: PropTypes.oneOfType([
        PropTypes.element,
        PropTypes.func,
    ]),
    priceUnit: PropTypes.string.isRequired,
    label: PropTypes.node,
    collapsible: PropTypes.bool,
};

export default GenerateFacets;
