import React from 'react';
import PropTypes from 'prop-types';

import FacetItem from './FacetItem';
import { List, Input } from '../../../components';

class GenerateFacets extends React.Component {
    constructor(props) {
        super(props);
        const formattedFacets = props.bucketedFacets.map((bucketedFacet) => {
            return {
                ...bucketedFacet,
                isOpen: true,
                filter: '',
            };
        });
        this.state = { bucketedFacets: formattedFacets };
    }

    componentDidUpdate(prevProps) {
        const { bucketedFacets } = this.props;
        if (prevProps.bucketedFacets !== bucketedFacets) {
            const formattedBucketedFacets = bucketedFacets.map(
                (bucketedFacet) => {
                    const matchBucketedFacet = this.state.bucketedFacets.find(
                        (bucketedFacetObj) => {
                            return (
                                bucketedFacetObj.displayName ===
                                bucketedFacet.displayName
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

            this.setState((currentState) => {
                return {
                    ...currentState,
                    bucketedFacets: formattedBucketedFacets,
                };
            });
        }
    }

    handleCollapseToggle = (event) => {
        const facetId = event.target.dataset['unx_name'];
        this.setState((currentState) => {
            const updatedTextFacets = currentState.bucketedFacets.map(
                (bucketedFacet) => {
                    if (facetId === bucketedFacet.displayName) {
                        return {
                            ...bucketedFacet,
                            isOpen: !bucketedFacet.isOpen,
                        };
                    }
                    return { ...bucketedFacet };
                }
            );

            return { ...currentState, bucketedFacets: updatedTextFacets };
        });
    };

    handleFilterChange = (event) => {
        const facetId = event.target.name;
        const value = event.target.value;
        this.setState((currentState) => {
            const updatedTextFacets = currentState.bucketedFacets.map(
                (bucketedFacet) => {
                    if (facetId === bucketedFacet.displayName) {
                        return {
                            ...bucketedFacet,
                            filter: value.toLowerCase(),
                        };
                    }
                    return { ...bucketedFacet };
                }
            );

            return { ...currentState, bucketedFacets: updatedTextFacets };
        });
    };

    render() {
        const {
            addCategoryFilter,
            breadCrumbsList,
            FacetItemComponent,
            label,
            collapsible,
            searchable,
        } = this.props;

        const { bucketedFacets } = this.state;

        if (
            bucketedFacets.length === 0 ||
            (bucketedFacets.length && bucketedFacets[0].values.length === 0)
        ) {
            return null;
        }

        return (
            <div className="UNX-bucketedFacet__container">
                {label ? label : null}
                {bucketedFacets.map((bucketedFacet) => {
                    const {
                        displayName,
                        level,
                        multiLevelField,
                        values = [],
                        isOpen,
                        filter,
                    } = bucketedFacet;
                    const breadCrumbsLength = breadCrumbsList.length;
                    let filteredValues = values;
                    if (filter.length > 0) {
                        filteredValues = values.filter((value) => {
                            return value.name.toLowerCase().includes(filter);
                        });
                    }

                    if (
                        breadCrumbsLength === level ||
                        breadCrumbsLength > level
                    ) {
                        return null;
                    }

                    return (
                        <div
                            className={`UNX-facet__element ${
                                isOpen ? 'open' : ''
                            }`}
                            key={multiLevelField}
                        >
                            <div className="UNX-facet__header">
                                {displayName}

                                {collapsible && (
                                    <span
                                        className="-collapse-icon"
                                        data-unx_name={displayName}
                                        onClick={this.handleCollapseToggle}
                                    />
                                )}
                            </div>

                            {searchable && isOpen && (
                                <div className="UNX-facetFilter__container">
                                    <Input
                                        className="-input"
                                        value={filter}
                                        name={displayName}
                                        onChange={this.handleFilterChange}
                                    />
                                </div>
                            )}
                            <List
                                items={filteredValues}
                                ListItem={FacetItemComponent || FacetItem}
                                idAttribute={'name'}
                                level={level}
                                multiLevelField={multiLevelField}
                                onClick={addCategoryFilter}
                                className="UNX-facet__list"
                            />
                        </div>
                    );
                })}
            </div>
        );
    }
}

GenerateFacets.propTypes = {
    bucketedFacets: PropTypes.array.isRequired,
    addCategoryFilter: PropTypes.func.isRequired,
    breadCrumbsList: PropTypes.array.isRequired,
    FacetItemComponent: PropTypes.oneOfType([
        PropTypes.element,
        PropTypes.func,
    ]),
    label: PropTypes.node,
    collapsible: PropTypes.bool,
    searchable: PropTypes.bool,
};

export default GenerateFacets;
