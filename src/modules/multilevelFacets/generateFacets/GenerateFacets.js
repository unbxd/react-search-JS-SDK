import React from 'react';
import PropTypes from 'prop-types';

import FacetItem from './FacetItem';
import { List, Input, ViewMore } from '../../../components';

class GenerateFacets extends React.Component {
    constructor(props) {
        super(props);
        this.state = { multilevelFacetsList: props.multilevelFacets };
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
                                bucketedFacetObj.facetDisplayName ===
                                bucketedFacet.facetDisplayName
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
                    };
                }
            );
            const multiFacets = formattedMultilevelFacets.map((multiFacet) => {
                multiFacet.viewLess = false;
                multiFacet.className = 'UNX-facet__list';
                return multiFacet;
            });

            this.setState((existingState) => {
                return {
                    ...existingState,
                    multilevelFacetsList: multiFacets,
                };
            });
        }
    }

    handleCollapseToggle = (event) => {
        const facetId = event.target.dataset['unx_name'];
        this.setState((existingState) => {
            const { multilevelFacetsList } = existingState;
            const updatedTextFacets = multilevelFacetsList.map(
                (multilevelFacet) => {
                    if (facetId === multilevelFacet.facetDisplayName) {
                        return {
                            ...multilevelFacet,
                            isOpen: !multilevelFacet.isOpen,
                        };
                    }
                    return { ...multilevelFacet };
                }
            );

            return {
                ...existingState,
                multilevelFacetsList: updatedTextFacets,
            };
        });
    };

    handleFilterChange = (event) => {
        const facetId = event.target.name;
        const value = event.target.value;
        this.setState((existingState) => {
            const { multilevelFacetsList } = existingState;
            const updatedMultilevelFacets = multilevelFacetsList.map(
                (bucketedFacet) => {
                    if (facetId === bucketedFacet.facetDisplayName) {
                        return {
                            ...bucketedFacet,
                            filter: value.toLowerCase(),
                        };
                    }
                    return { ...bucketedFacet };
                }
            );

            return {
                ...existingState,
                multilevelFacetsList: updatedMultilevelFacets,
            };
        });
    };

    toggleViewLess = (event) => {
        const facetName = event.target.dataset['unx_name'];
        this.setState((existingState) => {
            const { multilevelFacetsList } = existingState;
            const interimCombinedFacets = multilevelFacetsList.map(
                (multiFacet) => {
                    if (multiFacet.facetDisplayName === facetName) {
                        return {
                            ...multiFacet,
                            viewLess: !multiFacet['viewLess'],
                        };
                    }
                    return { ...multiFacet };
                }
            );
            return {
                ...existingState,
                multilevelFacetsList: interimCombinedFacets,
            };
        });
    };

    render() {
        const {
            onFacetClick,
            FacetItemComponent,
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
                {label ? label : null}
                {multilevelFacetsList.map((multilevelFacet) => {
                    const {
                        facetDisplayName,
                        multiLevelField,
                        values = [],
                        isOpen = true,
                        filter = '',
                        viewLess,
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
                            key={multiLevelField}
                        >
                            <div className="UNX-facet__header">
                                {facetDisplayName}

                                {collapsible && (
                                    <span
                                        className="-collapse-icon"
                                        data-unx_name={facetDisplayName}
                                        onClick={this.handleCollapseToggle}
                                    />
                                )}
                            </div>

                            {searchable && isOpen && (
                                <div className="UNX-facetFilter__container">
                                    <Input
                                        className="-input"
                                        value={filter}
                                        name={facetDisplayName}
                                        onChange={this.handleFilterChange}
                                        data-testid={'UNX_searchFacets'}
                                    />
                                </div>
                            )}
                            <List
                                items={filteredValues}
                                ListItem={FacetItemComponent || FacetItem}
                                idAttribute={'name'}
                                onClick={onFacetClick}
                                className={`UNX-facet__list ${
                                    viewLess ? 'UNX-facet__listShowLimited' : ''
                                }`}
                            />
                            {enableViewMore && isOpen && filteredValues.length > minViewMore? 
                                <ViewMore  facetName={facetDisplayName} toggleViewLess={this.toggleViewLess} viewLess={viewLess}/>: null }
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
    FacetItemComponent: PropTypes.oneOfType([
        PropTypes.element,
        PropTypes.func,
    ]),
    label: PropTypes.node,
    collapsible: PropTypes.bool,
    searchable: PropTypes.bool,
};

export default GenerateFacets;
