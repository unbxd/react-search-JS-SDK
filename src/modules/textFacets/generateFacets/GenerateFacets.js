import React from 'react';
import PropTypes from 'prop-types';

import { List, Input, ViewMore } from '../../../components';
import FacetItem from './FacetItem';
import { searchStatus } from './../../../config';

class GenerateFacets extends React.Component {
    constructor(props) {
        super(props);
        const { textFacets } = props;
        this.state = { textFacetsList: textFacets };
    }

    componentDidUpdate(prevProps) {
        const {
            textFacets,
            selectedFacets,
            lastSelectedFacets,
            setSelectedFacets,
            unbxdCoreStatus,
            transform,
        } = this.props;
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
                    viewLess: false,
                    className: 'UNX-facet__list',
                };
            });

            if (transform && typeof transform === 'function') {
                let returnedFacets = transform.call(formattedTextFacets);
                this.setState(() => {
                    return { textFacetsList: returnedFacets };
                });
            } else {
                this.setState(() => {
                    return { textFacetsList: formattedTextFacets };
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
            const { textFacetsList } = existingState;
            const updatedTextFacets = textFacetsList.map((textFacet) => {
                if (facetId === textFacet.facetName) {
                    return { ...textFacet, isOpen: !textFacet.isOpen };
                }
                return { ...textFacet };
            });

            return { ...existingState, textFacetsList: updatedTextFacets };
        });
    };

    handleFilterChange = (event) => {
        const facetId = event.target.name;
        const value = event.target.value;
        this.setState((existingState) => {
            const { textFacetsList } = existingState;
            const updatedTextFacets = textFacetsList.map((textFacet) => {
                if (facetId === textFacet.facetName) {
                    return { ...textFacet, filter: value.toLowerCase() };
                }
                return { ...textFacet };
            });

            return { ...existingState, textFacetsList: updatedTextFacets };
        });
    };

    toggleViewLess = (event) => {
        const facetName = event.target.dataset['unx_name'];
        this.setState((existingState) => {
            const { textFacetsList } = existingState;
            const updatedTextFacets = textFacetsList.map((textFacet) => {
                if (textFacet.facetName === facetName) {
                    return {
                        ...textFacet,
                        viewLess: !textFacet['viewLess'],
                    };
                }
                return { ...textFacet };
            });
            return { ...existingState, textFacetsList: updatedTextFacets };
        });
    };

    render() {
        const {
            onFacetClick,
            onFacetObjectReset,
            facetItemComponent,
            label,
            collapsible,
            searchable,
            enableViewMore,
            minViewMore,
        } = this.props;

        const { textFacetsList } = this.state;

        if (textFacetsList.length === 0) {
            return null;
        }

        return (
            <div className="UNX-textFacet__container">
                {label ? label : null}
                {textFacetsList.map((facet) => {
                    const {
                        displayName,
                        facetName,
                        values,
                        isOpen = true,
                        filter = '',
                        viewLess,
                        isSelected = false,
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
                                        data-testid={'UNX_searchFacets'}
                                    />
                                </div>
                            )}
                            <List
                                items={filteredValues}
                                idAttribute={'dataId'}
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
                                    onClick={onFacetObjectReset}
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
    selectedFacets: PropTypes.object,
    lastSelectedFacets: PropTypes.object,
    onFacetClick: PropTypes.func.isRequired,
    onFacetObjectReset: PropTypes.func.isRequired,
    setSelectedFacets: PropTypes.func.isRequired,
    enableApplyFilters: PropTypes.bool.isRequired,
    unbxdCoreStatus: PropTypes.string.isRequired,
    facetItemComponent: PropTypes.element,
    label: PropTypes.node,
    collapsible: PropTypes.bool.isRequired,
    searchable: PropTypes.bool.isRequired,
};

export default GenerateFacets;
