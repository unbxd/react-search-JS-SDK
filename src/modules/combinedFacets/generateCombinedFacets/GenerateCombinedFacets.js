import React from 'react';
import { List, Input, ViewMore } from '../../../components';
import TextFacetItem from './TextFacetItem';
import RangeFacetItem from './RangeFacetItem';
import { facetTypes } from '../../../config';

class GenerateCombinedFacets extends React.Component {
    constructor(props) {
        super(props);
        this.state = { combinedFacetsList: props.combinedFacets };
    }

    componentDidUpdate(prevProps) {
        const { combinedFacets, transform } = this.props;
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
                        combinedFacetObj['filter'] = match.filter;
                        combinedFacetObj['isOpen'] = match.isOpen;
                    } else {
                        combinedFacetObj['viewLess'] = false;
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
            onTextFacetClick,
            onTextFacetClear,
            onRangeFacetClick,
            onRangeFacetClear,
            onMultilevelFacetClick,
            textFacetItemComponent,
            rangeFacetItemComponent,
            collapsible,
            searchable,
            rangeFacetItemComponent,
            multilevelFacetItemComponent,
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
                            isSelected = false
                        } = combinedFacet;

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
                                            textFacetItemComponent ||
                                            TextFacetItem
                                        }
                                        onClick={onTextFacetClick}
                                        className={`UNX-facet__list ${
                                            viewLess
                                                ? 'UNX-facet__listShowLimited'
                                                : ''
                                        }`}
                                    />
                                    {isSelected && (
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
                    if (
                        combinedFacet.facetType === facetTypes.MULTILEVEL_FACET
                    ) {
                        const {
                            facetName,
                            values,
                            isOpen = true,
                            filter = '',
                            viewLess
                        } = combinedFacet;
                        let filteredValues = values;
                        if (filter && filter.length > 0) {
                            filteredValues = values.filter((value) => {
                                return value.name
                                    .toLowerCase()
                                    .includes(filter);
                            });
                        }
                        return (
                            <div className="UNX-bucketedFacet__container">
                                <div
                                    className={`UNX-facet__element ${
                                        isOpen ? 'open' : ''
                                    }`}
                                >
                                    <div className="UNX-facet__header">
                                        {facetName}
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
                                                data-testid={'UNX_searchFacets'}
                                            />
                                        </div>
                                    )}
                                    <List
                                        items={filteredValues}
                                        ListItem={multilevelFacetItemComponent}
                                        idAttribute={'name'}
                                        onClick={onMultilevelFacetClick}
                                        className={`UNX-facet__list ${
                                            viewLess
                                                ? 'UNX-facet__listShowLimited'
                                                : ''
                                        }`}
                                    />
                                    {enableViewMore &&
                                    isOpen &&
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
                        viewLess
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
                                        rangeFacetItemComponent ||
                                        RangeFacetItem
                                    }
                                    onClick={onRangeFacetClick}
                                    idAttribute={facetName}
                                    facetName={facetName}
                                    className={`UNX-facet__list ${
                                        viewLess
                                            ? 'UNX-facet__listShowLimited'
                                            : ''
                                    }`}
                                    priceUnit={priceUnit}
                                />
                                {isSelected && (
                                    <div
                                        onClick={onRangeFacetClear}
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
