import React from 'react';
import PropTypes from 'prop-types';
import {
    toggleViewLess,
    handleCollapseToggle,
    handleFilterChange
} from '../../../common/facetUtils';
import { List, Input, ViewMore } from '../../../components';
import FacetItem from './FacetItem';

class GenerateFacets extends React.Component {
    constructor(props) {
        super(props);
        const { textFacets } = props;
        this.state = { textFacetsList: textFacets };
        this.toggleViewLess = toggleViewLess.bind(this, 'textFacetsList');
        this.handleFilterChange = handleFilterChange.bind(
            this,
            'textFacetsList'
        );
        this.handleCollapseToggle = handleCollapseToggle.bind(
            this,
            'textFacetsList'
        );
    }

    componentDidUpdate(prevProps) {
        const { textFacets, transform } = this.props;
        if (textFacets !== prevProps.textFacets) {
            const formattedTextFacets = textFacets.map((textFacet) => {
                const { textFacetsList } = this.state;
                const matchTextFacet = textFacetsList.find(
                    (facetObj) => facetObj.facetName === textFacet.facetName
                );
                return {
                    ...textFacet,
                    isOpen: matchTextFacet ? matchTextFacet.isOpen : true,
                    filter: matchTextFacet ? matchTextFacet.filter : '',
                    viewLess: matchTextFacet ? matchTextFacet.viewLess : false
                };
            });

            if (transform && typeof transform === 'function') {
                const returnedFacets = transform.call(formattedTextFacets);
                this.setState(() => {
                    return { textFacetsList: returnedFacets };
                });
            } else {
                this.setState(() => {
                    return { textFacetsList: formattedTextFacets };
                });
            }
        }
    }

    render() {
        const {
            onFacetClick,
            onFacetClear,
            facetItemComponent,
            label,
            collapsible,
            searchable,
            enableViewMore,
            minViewMore
        } = this.props;

        const { textFacetsList } = this.state;

        if (textFacetsList.length === 0) {
            return null;
        }

        return (
            <div className="UNX-textFacet__container">
                {label || null}
                {textFacetsList.map((facet) => {
                    const {
                        displayName,
                        facetName,
                        values,
                        isOpen = true,
                        filter = '',
                        viewLess,
                        isSelected = false
                    } = facet;

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
                                        name={facetName}
                                        onChange={this.handleFilterChange}
                                        data-testid="UNX_searchFacets"
                                        ariaLabel={`${displayName} facets filter`}
                                    />
                                </div>
                            )}
                            <List
                                items={filteredValues}
                                idAttribute="dataId"
                                ListItem={facetItemComponent || FacetItem}
                                onClick={onFacetClick}
                                className={`UNX-facet__list ${
                                    viewLess ? 'UNX-facet__listShowLimited' : ''
                                }`}
                            />
                            {isSelected && (
                                <div
                                    className="-clear"
                                    data-unx_name={facetName}
                                    onClick={onFacetClear}
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
    textFacets: PropTypes.arrayOf(PropTypes.object),
    selectedTextFacets: PropTypes.object,
    lastSelectedTextFacets: PropTypes.object,
    onFacetClick: PropTypes.func.isRequired,
    onFacetClear: PropTypes.func.isRequired,
    enableApplyFilters: PropTypes.bool.isRequired,
    unbxdCoreStatus: PropTypes.string.isRequired,
    facetItemComponent: PropTypes.element,
    label: PropTypes.node,
    collapsible: PropTypes.bool.isRequired,
    searchable: PropTypes.bool.isRequired,
    transform: PropTypes.func
};

export default GenerateFacets;
