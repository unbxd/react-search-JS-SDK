import React from 'react';
import {
    toggleViewLess,
    handleCollapseToggle,
    handleFilterChange
} from '../../../common/facetUtils';
import { List, Input, ViewMore } from '../../../components';
import { FacetItem as TextFacetItem } from '../../textFacets/generateFacets';
import { FacetItem as RangeFacetItem } from '../../rangeFacets/generateFacets';
import { FacetItem as MultilevelFacetItem } from '../../multilevelFacets/generateFacets';
import { facetTypes } from '../../../config';

class GenerateCombinedFacets extends React.Component {
    constructor(props) {
        super(props);
        this.state = { combinedFacetsList: props.combinedFacets };
        this.toggleViewLess = toggleViewLess.bind(this, 'combinedFacetsList');
        this.handleFilterChange = handleFilterChange.bind(
            this,
            'combinedFacetsList'
        );
        this.handleCollapseToggle = handleCollapseToggle.bind(
            this,
            'combinedFacetsList'
        );
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
                        return {
                            ...combinedFacetObj,
                            viewLess: match.viewLess,
                            filter: match.filter,
                            isOpen: match.isOpen
                        };
                    }
                    return {
                        ...combinedFacetObj
                    };
                }
            );
            if (transform && typeof transform === 'function') {
                const returnedFacets = transform.call(formattedCombinedFacets);
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
                            <div
                                className="UNX-textFacet__container"
                                key={facetName}
                            >
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
                                        idAttribute="dataId"
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
                            filterField,
                            displayName,
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
                            <div
                                className="UNX-bucketedFacet__container"
                                key={filterField}
                            >
                                <div
                                    className={`UNX-facet__element ${
                                        isOpen ? 'open' : ''
                                    }`}
                                >
                                    <div className="UNX-facet__header">
                                        {displayName}
                                        {collapsible && (
                                            <span
                                                className="-collapse-icon"
                                                data-unx_name={filterField}
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
                                                name={filterField}
                                                onChange={
                                                    this.handleFilterChange
                                                }
                                                data-testid="UNX_searchFacets"
                                            />
                                        </div>
                                    )}
                                    <List
                                        items={filteredValues}
                                        ListItem={
                                            multilevelFacetItemComponent ||
                                            MultilevelFacetItem
                                        }
                                        idAttribute="dataId"
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
                                            facetName={filterField}
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
                        <div
                            className="UNX-rangefacet__container"
                            key={facetName}
                        >
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
                                    idAttribute="dataId"
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
