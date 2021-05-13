import React from 'react';
import PropTypes from 'prop-types';
import {
    toggleViewLess,
    handleCollapseToggle,
    handleFilterChange
} from '../../../common/facetUtils';
import FacetItem from './FacetItem';
import { List, Input, ViewMore } from '../../../components';

class GenerateFacets extends React.Component {
    constructor(props) {
        super(props);
        this.state = { multilevelFacetsList: props.multilevelFacets };
        this.toggleViewLess = toggleViewLess.bind(this, 'multilevelFacetsList');
        this.handleFilterChange = handleFilterChange.bind(
            this,
            'multilevelFacetsList'
        );
        this.handleCollapseToggle = handleCollapseToggle.bind(
            this,
            'multilevelFacetsList'
        );
    }

    componentDidUpdate(prevProps) {
        const { multilevelFacets } = this.props;
        if (prevProps.multilevelFacets !== multilevelFacets) {
            const formattedMultilevelFacets = multilevelFacets.map(
                (bucketedFacet) => {
                    const { multilevelFacetsList } = this.state;
                    const matchBucketedFacet = multilevelFacetsList.find(
                        (bucketedFacetObj) => {
                            return (
                                bucketedFacetObj.filterField ===
                                bucketedFacet.filterField
                            );
                        }
                    );
                    return {
                        ...bucketedFacet,
                        isOpen: matchBucketedFacet
                            ? matchBucketedFacet.isOpen
                            : true,
                        filter: matchBucketedFacet
                            ? matchBucketedFacet.filter
                            : '',
                        viewLess: matchBucketedFacet
                            ? matchBucketedFacet.viewLess
                            : false
                    };
                }
            );

            this.setState((existingState) => {
                return {
                    ...existingState,
                    multilevelFacetsList: formattedMultilevelFacets
                };
            });
        }
    }

    render() {
        const {
            onFacetClick,
            facetItemComponent,
            label,
            collapsible,
            searchable,
            enableViewMore,
            minViewMore
        } = this.props;

        const { multilevelFacetsList } = this.state;

        if (multilevelFacetsList.length === 0) {
            return null;
        }

        return (
            <div className="UNX-bucketedFacet__container">
                {label || null}
                {multilevelFacetsList.map((multilevelFacet) => {
                    const {
                        displayName,
                        filterField,
                        values = [],
                        isOpen = true,
                        filter = '',
                        viewLess
                    } = multilevelFacet;

                    let filteredValues = values;
                    if (filter.length > 0) {
                        filteredValues = values.filter((value) => {
                            return value.name.toLowerCase().includes(filter);
                        });
                    }

                    return (
                        <div
                            className={`UNX-facet__element ${
                                isOpen ? 'open' : ''
                            }`}
                            key={filterField}
                        >
                            <div className="UNX-facet__header">
                                {displayName}

                                {collapsible && (
                                    <span
                                        className="-collapse-icon"
                                        data-unx_name={filterField}
                                        onClick={this.handleCollapseToggle}
                                        tabIndex={0}
                                        role={'button'}
                                        aria-label={`${
                                            isOpen ? 'collapse' : 'open'
                                        } facets`}
                                    />
                                )}
                            </div>

                            {searchable && isOpen && (
                                <div className="UNX-facetFilter__container">
                                    <Input
                                        className="-input"
                                        value={filter}
                                        name={filterField}
                                        onChange={this.handleFilterChange}
                                        data-testid="UNX_searchFacets"
                                        ariaLabel={`${displayName} facets filter`}
                                    />
                                </div>
                            )}
                            <List
                                items={filteredValues}
                                ListItem={facetItemComponent || FacetItem}
                                idAttribute="dataId"
                                onClick={onFacetClick}
                                className={`UNX-facet__list ${
                                    viewLess ? 'UNX-facet__listShowLimited' : ''
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
                    );
                })}
            </div>
        );
    }
}

GenerateFacets.propTypes = {
    multilevelFacets: PropTypes.array.isRequired,
    onFacetClick: PropTypes.func.isRequired,
    facetItemComponent: PropTypes.element,
    label: PropTypes.node,
    collapsible: PropTypes.bool,
    searchable: PropTypes.bool
};

export default GenerateFacets;
