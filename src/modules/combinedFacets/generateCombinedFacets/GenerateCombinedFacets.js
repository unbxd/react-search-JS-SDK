import React from 'react';
import { List, Input, ViewMore } from '../../../components';
import TextFacetItem from './TextFacetItem';
import RangeFacetItem from './RangeFacetItem';
import { searchStatus, facetTypes } from '../../../config';
import { executeCallback } from '../../../common/utils';

class GenerateCombinedFacets extends React.Component {
    constructor(props) {
        super(props);
        this.state = { combinedFacetsList: props.combinedFacets };
    }

    setFacetValue(facetObj, getResults = false) {
        const { onFacetClick} = this.props;
        const { facetName, valMin, valMax, isSelected } = facetObj;
        const applyMultiple = true;

        const onFinish = () => {
            this.setState((existingState) => {
                const { combinedFacetsList } = existingState;
                const updatedRangeValues = combinedFacetsList.map(
                    (rangeValue) => {
                        if (
                            rangeValue.facetType === facetTypes.RANGE_FACET &&
                            rangeValue.facetName === facetName
                        ) {
                            //also go into values and set the specific from to as is selected
                            let isFacetSelected = false;
                            const updatedValues = rangeValue.values.map(
                                (facetValue) => {
                                    const {
                                        from,
                                        end,
                                        isSelected = false
                                    } = facetValue;
                                    const { dataId: fromValue } = from;
                                    const { dataId: toValue } = end;

                                    if (valMin >= fromValue && valMax <= toValue) {
                                        if (!isSelected) {
                                            isFacetSelected = true;
                                        }
                                        return {
                                            ...facetValue,
                                            isSelected: !isSelected
                                        };
                                    } else {
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
                    }
                );

                return {
                    ...existingState,
                    combinedFacetsList: updatedRangeValues
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

    componentDidUpdate(prevProps) {
        const {
            unbxdCoreStatus,
            combinedFacets,
            lastSelectedFacets,
            selectedFacets,
            setSelectedFacets,
            transform
        } = this.props;
        if (combinedFacets !== prevProps.combinedFacets) {
            // sorting the array
            let formattedCombinedFacets = [...combinedFacets];
            formattedCombinedFacets.sort((a, b) => {
                return a.position - b.position;
            });
            formattedCombinedFacets = formattedCombinedFacets.map(
                (combinedFacet) => {
                    const { combinedFacetsList } = this.state;
                    const match = combinedFacetsList.find(
                        (combinedFacetObj) =>
                            combinedFacetObj.facetName ===
                            combinedFacet.facetName
                    );
                    const combinedFacetObj = { ...combinedFacet };
                    if (match) {
                        combinedFacetObj['viewLess'] = match.viewLess;
                        combinedFacetObj['className'] = 'UNX-facet__list';
                        combinedFacetObj['filter'] = match.filter;
                        combinedFacetObj['isOpen'] = match.isOpen;
                    } else {
                        combinedFacetObj['viewLess'] = false;
                        combinedFacetObj['className'] = 'UNX-facet__list';
                        combinedFacetObj['filter'] = '';
                        combinedFacetObj['isOpen'] = true;
                    }

                    return combinedFacetObj;
                }
            );
            if (transform && typeof transform === 'function') {
                let returnedFacets = transform.call(formattedCombinedFacets);
                this.setState(() => {
                    return { combinedFacetsList: returnedFacets };
                });
            } else {
                this.setState(() => {
                    return { combinedFacetsList: formattedCombinedFacets };
                });
            }
        }

        if (
            prevProps.unbxdCoreStatus !== unbxdCoreStatus &&
            unbxdCoreStatus === searchStatus.READY &&
            selectedFacets !== lastSelectedFacets
        ) {
            setSelectedFacets(lastSelectedFacets);
        }
    }

    handleCollapseToggle = (event) => {
        const facetId = event.target.dataset['unx_name'];
        this.setState((existingState) => {
            const { combinedFacetsList } = existingState;
            const updatedCombinedFacets = combinedFacetsList.map(
                (combinedFacet) => {
                    if (facetId === combinedFacet.facetName) {
                        return {
                            ...combinedFacet,
                            isOpen: !combinedFacet.isOpen
                        };
                    }
                    return { ...combinedFacet };
                }
            );

            return {
                ...existingState,
                combinedFacetsList: updatedCombinedFacets
            };
        });
    };

    handleFilterChange = (event) => {
        const facetId = event.target.name;
        const value = event.target.value;
        this.setState((existingState) => {
            const { combinedFacetsList } = existingState;
            const updatedCombinedFacets = combinedFacetsList.map(
                (combinedFacet) => {
                    if (facetId === combinedFacet.facetName) {
                        return {
                            ...combinedFacet,
                            filter: value.toLowerCase()
                        };
                    }
                    return { ...combinedFacet };
                }
            );

            return {
                ...existingState,
                combinedFacetsList: updatedCombinedFacets
            };
        });
    };

    onApplyFilter = () => {
        const { applyRangeFacet } = this.props;
        applyRangeFacet();
    };

    onRangeFacetClear = (event) => {
        const facetName = event.target.dataset['unx_facetname'];

        const { removeRangeFacet } = this.props;
        removeRangeFacet({ facetName });
        this.setState((existingState) => {
            const { combinedFacetsList } = existingState;
            const updatedRangeValues = combinedFacetsList.map((rangeValue) => {
                if (
                    rangeValue.facetName === facetName &&
                    rangeValue.facetType === facetTypes.RANGE_FACET
                ) {
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
                ...existingState,
                combinedFacetsList: updatedRangeValues
            };
        });

        !applyMutiple && this.onApplyFilter();
    };

    handleRangeFacetClick = (currentItem) => {
        const { from, end, facetName, isSelected = false } = currentItem;
        const { dataId: valMin } = from;
        const { dataId: valMax } = end;

        const { enableApplyFilters } = this.props;
        const facetObj = { facetName, valMin, valMax, isSelected };
        this.setFacetValue(facetObj, !enableApplyFilters);
    };

    toggleViewLess = (event) => {
        const facetName = event.target.dataset['unx_name'];
        this.setState((existingState) => {
            const { combinedFacetsList } = existingState;
            const updatedCombinedFacets = combinedFacetsList.map(
                (combinedFacet) => {
                    if (combinedFacet.facetName === facetName) {
                        const currentFacet = { ...combinedFacet };
                        currentFacet['viewLess'] = !currentFacet['viewLess'];
                        if (currentFacet['viewLess']) {
                            currentFacet.className =
                                'UNX-facet__list UNX-facet__listShowLimited';
                        } else {
                            currentFacet.className = 'UNX-facet__list';
                        }
                        return {
                            ...combinedFacet,
                            viewLess: currentFacet['viewLess'],
                            className: currentFacet['className']
                        };
                    }
                    return { ...combinedFacet };
                }
            );
            return {
                ...existingState,
                combinedFacetsList: updatedCombinedFacets
            };
        });
    };

    render() {
        const {
            selectedFacets,
            onTextFacetClick,
            onTextFacetClear,
            TextFacetItemComponent,
            collapsible,
            searchable,
            RangeFacetItemComponent,
            priceUnit,
            enableViewMore,
            minViewMore
        } = this.props;

        const { combinedFacetsList } = this.state;

        if (combinedFacetsList && combinedFacetsList.length === 0) {
            return null;
        }

        return (
            <div>
                {combinedFacetsList.map((combinedFacet) => {
                    if (combinedFacet.facetType === facetTypes.TEXT_FACET) {
                        const {
                            displayName,
                            facetName,
                            values,
                            isOpen = true,
                            filter = '',
                            viewLess,
                            className
                        } = combinedFacet;
                        const hasActiveFacets = selectedFacets[facetName]
                            ? true
                            : false;
                        let filteredValues = values;
                        if (filter && filter.length > 0) {
                            filteredValues = values.filter((value) => {
                                return value.name
                                    .toLowerCase()
                                    .includes(filter);
                            });
                        }

                        return (
                            <div className="UNX-textFacet__container">
                                <div
                                    className={`UNX-facet__element ${
                                        isOpen ? 'open' : ''
                                    }`}
                                    key={facetName}
                                >
                                    <div
                                        className="UNX-facet__header"
                                        data-unx_name={facetName}
                                    >
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
                                    {searchable && isOpen && (
                                        <div className="UNX-facetFilter__container">
                                            <Input
                                                className="-input"
                                                value={filter}
                                                name={facetName}
                                                onChange={
                                                    this.handleFilterChange
                                                }
                                            />
                                        </div>
                                    )}
                                    <List
                                        items={filteredValues}
                                        ListItem={
                                            TextFacetItemComponent ||
                                            TextFacetItem
                                        }
                                        onClick={onTextFacetClick}
                                        className={
                                            className || 'UNX-facet__list'
                                        }
                                    />
                                    {hasActiveFacets && (
                                        <div
                                            className="-clear"
                                            data-unx_name={facetName}
                                            onClick={onTextFacetClear}
                                        >
                                            Clear
                                        </div>
                                    )}
                                    {enableViewMore &&
                                    isOpen &&
                                    filteredValues &&
                                    filteredValues.length > minViewMore ? (
                                        <ViewMore
                                            facetName={facetName}
                                            toggleViewLess={this.toggleViewLess}
                                            viewLess={viewLess}
                                        />
                                    ) : null}
                                </div>
                            </div>
                        );
                    }
                    const {
                        displayName,
                        isOpen = true,
                        facetName,
                        values,
                        isSelected,
                        viewLess,
                        className
                    } = combinedFacet;
                    return (
                        <div className="UNX-rangefacet__container">
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
                                        RangeFacetItemComponent ||
                                        RangeFacetItem
                                    }
                                    onClick={this.handleRangeFacetClick}
                                    idAttribute={facetName}
                                    facetName={facetName}
                                    className={className}
                                    priceUnit={priceUnit}
                                />
                                {isSelected && (
                                    <div
                                        onClick={this.onRangeFacetClear}
                                        data-unx_facetname={facetName}
                                        className="-clear"
                                    >
                                        Clear
                                    </div>
                                )}
                                {enableViewMore &&
                                isOpen &&
                                values &&
                                values.length > minViewMore ? (
                                    <ViewMore
                                        facetName={facetName}
                                        toggleViewLess={this.toggleViewLess}
                                        viewLess={viewLess}
                                    />
                                ) : null}
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    }
}

export default GenerateCombinedFacets;
