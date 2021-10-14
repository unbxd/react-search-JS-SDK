import React from 'react';
import PropTypes from 'prop-types';

import { conditionalRenderer, executeCallback } from '../../common/utils';
import {
    getMultilevelFacetCoreMethods,
    getFormattedMultilevelFacets
} from './utils';
import MultilevelFacetsWrapper from './MultilevelFacetsWrapper';
import { productTypes } from '../../config';

class MultilevelFacetsContainer extends React.PureComponent {
    getMultilevelFacetsProps() {
        const {
            unbxdCore,
            facetItemComponent,
            label,
            collapsible,
            searchable,
            onFacetClick,
            enableViewMore,
            minViewMore,
            productType
        } = this.props;

        const {
            getBucketedFacets,
            getBreadCrumbsList,
            setCategoryFilter,
            deleteCategoryFilter
        } = getMultilevelFacetCoreMethods(unbxdCore);

        const multilevelFacets = getBucketedFacets() || [];

        const formattedMultilevelFacets = getFormattedMultilevelFacets(
            multilevelFacets,
            unbxdCore
        );

        const handleFacetClick = (currentItem) => {
            const { name, filterField: parent, level } = currentItem;
            const categoryObject = {
                parent,
                level,
                name: unbxdCore.encodeCategoryFacetValue(name)
            };
            const { helpers } = this.props;
            const { getUpdatedResults } = helpers;
            const currentMultilevelFacet = formattedMultilevelFacets.find(
                (multilevelFacet) => multilevelFacet.filterField === parent
            );
            const { highestBreadcrumbLevel } = currentMultilevelFacet;
            const onFinish = () => {
                if (highestBreadcrumbLevel === parseInt(level)) {
                    deleteCategoryFilter(categoryObject);
                } else {
                    // check if it is a breadcrumb
                    const breadCrumbsList = getBreadCrumbsList(parent);
                    if (productType === productTypes.CATEGORY) {
                        unbxdCore.state.categoryFilter[parent] = [];
                        const breadCrumbs = getBreadCrumbsList(parent);
                        breadCrumbs.forEach((element) => {
                            const {
                                value: breadcrumbValue,
                                level: breadcrumbLevel
                            } = element;
                            setCategoryFilter({
                                parent,
                                level: breadcrumbLevel,
                                name: breadcrumbValue
                            });
                        });
                        if (categoryObject.level >= highestBreadcrumbLevel) {
                            setCategoryFilter(categoryObject);
                        } else {
                            deleteCategoryFilter(categoryObject);
                        }
                        getUpdatedResults();
                    } else {
                        const hit = breadCrumbsList.find(({ value }) => {
                            return name === value;
                        });

                        if (hit) {
                            deleteCategoryFilter(categoryObject);
                        } else {
                            setCategoryFilter(categoryObject);
                        }
                    }
                }
                getUpdatedResults();
            };
            executeCallback(onFacetClick, [categoryObject], onFinish);
        };

        return {
            multilevelFacets: formattedMultilevelFacets,
            onFacetClick: handleFacetClick,
            facetItemComponent,
            label,
            collapsible,
            searchable,
            enableViewMore,
            minViewMore
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
    productType: PropTypes.string,
    facetDepth: PropTypes.number,
    facetLimit: PropTypes.number,
    facetItemComponent: PropTypes.element,
    label: PropTypes.node,
    collapsible: PropTypes.bool,
    searchable: PropTypes.bool,
    enableViewMore: PropTypes.bool,
    minViewMore: PropTypes.number,
    onFacetClick: PropTypes.func,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

export default MultilevelFacetsContainer;
