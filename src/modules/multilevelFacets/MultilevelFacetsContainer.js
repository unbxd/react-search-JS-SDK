import React from 'react';
import PropTypes from 'prop-types';

import { conditionalRenderer } from '../../common/utils';
import { getFacetCoreMethods } from './utils';
import MultilevelFacetsWrapper from './MultilevelFacetsWrapper';
import { productTypes } from '../../config';
import { executeCallback } from '../../common/utils';

class MultilevelFacetsContainer extends React.PureComponent {
    componentDidMount() {
        const {
            categoryDisplayName = '',
            categoryField = '',
            facetDepth,
            facetLimit,
            helpers: { setMultilevelFacetsConfiguration },
        } = this.props;

        setMultilevelFacetsConfiguration({
            categoryDisplayName,
            categoryField,
            facetDepth,
            facetLimit,
        });
    }

    getMultilevelFacetsProps() {
        const {
            unbxdCore,
            FacetItemComponent,
            label,
            collapsible,
            searchable,
            onFacetClick,
            enableViewMore,
            minViewMore,
            productType,
        } = this.props;

        const {
            getBucketedFacets,
            getBreadCrumbsList,
            setCategoryFilter,
            deleteCategoryFilter,
            getResults,
        } = getFacetCoreMethods(unbxdCore);

        const bucketedFacets = getBucketedFacets();
        const breadCrumbsList = getBreadCrumbsList();

        const multilevelFacets = [];
        let highestBreadcrumbLevel = 0;
        const breadCrumbFacets = breadCrumbsList.map((breadcrumb) => {
            const { filterField, level, value } = breadcrumb;
            if (highestBreadcrumbLevel < level) {
                highestBreadcrumbLevel = level;
            }
            return {
                fieldName: filterField,
                level,
                name: value,
                isSelected: true,
            };
        });

        let facetDisplayName = '';
        let fieldName = '';
        bucketedFacets.map((bucketedFacet) => {
            const {
                displayName,
                level,
                multiLevelField,
                values = [],
            } = bucketedFacet;
            facetDisplayName = displayName;
            fieldName = multiLevelField;

            let formattedBucketedFacets = [];
            if (
                highestBreadcrumbLevel === level &&
                highestBreadcrumbLevel > 0
            ) {
                const lastBreadcrumb =
                    breadCrumbFacets[breadCrumbFacets.length - 1];
                const hit = values.find((facetValue) => {
                    const { name } = facetValue;
                    const { name: breadcrumbName } = lastBreadcrumb;
                    return breadcrumbName === name;
                });
                formattedBucketedFacets = [
                    {
                        ...hit,
                        fieldName: multiLevelField,
                        level,
                        isSelected: true,
                    },
                ];
                breadCrumbFacets.pop();
            } else {
                formattedBucketedFacets = values.map((facetValue) => {
                    const { name, count, dataId } = facetValue;
                    return {
                        fieldName: multiLevelField,
                        level,
                        name,
                        count,
                        dataId,
                    };
                });
            }

            const facet = {
                facetDisplayName,
                multiLevelField: fieldName,
                values: [...breadCrumbFacets, ...formattedBucketedFacets],
            };
            multilevelFacets.push(facet);
        });

        const handleFacetClick = (currentItem) => {
            const { name, fieldName: parent, level } = currentItem;
            const categoryObject = { parent, level, name };
            const { helpers } = this.props;
            const { getUpdatedResults } = helpers;

            const onFinish = () => {
                const { setCategoryId } = unbxdCore;
                if (
                    productType === productTypes.CATEGORY &&
                    typeof setCategoryId === 'function'
                ) {
                    const getResults = setCategoryId(categoryObject, unbxdCore);
                    if (getResults) {
                        getUpdatedResults();
                    }
                } else {
                    if (highestBreadcrumbLevel === parseInt(level)) {
                        deleteCategoryFilter(categoryObject);
                    } else {
                        //check if it is a breadcrumb
                        const hit = breadCrumbsList.find(({ value }) => {
                            return name === value;
                        });

                        if (hit) {
                            deleteCategoryFilter(categoryObject);
                        } else {
                            setCategoryFilter(categoryObject);
                        }
                    }
                    getResults();
                }
            };
            executeCallback(onFacetClick, [categoryObject], onFinish);
        };

        return {
            multilevelFacets,
            onFacetClick: handleFacetClick,
            FacetItemComponent,
            label,
            collapsible,
            searchable,
            enableViewMore,
            minViewMore,
        };
    }

    render() {
        const DefaultRender = MultilevelFacetsWrapper;

        return conditionalRenderer(
            this.props.children,
            this.getMultilevelFacetsProps(),
            DefaultRender
        );
    }
}

MultilevelFacetsContainer.propTypes = {
    unbxdCore: PropTypes.object.isRequired,
    unbxdCoreStatus: PropTypes.string.isRequired,
    helpers: PropTypes.object.isRequired,
    categoryDisplayName: PropTypes.string.isRequired,
    categoryField: PropTypes.string.isRequired,
    facetDepth: PropTypes.number,
    facetLimit: PropTypes.number,
    FacetItemComponent: PropTypes.oneOfType([
        PropTypes.element,
        PropTypes.func,
    ]),
    label: PropTypes.node,
    collapsible: PropTypes.bool,
    searchable: PropTypes.bool,
    onFacetClick: PropTypes.node,
};

export default MultilevelFacetsContainer;
