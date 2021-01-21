import React from 'react';
import PropTypes from 'prop-types';

import { conditionalRenderer, executeCallback } from '../../common/utils';
import { getFacetCoreMethods } from './utils';
import BreadcrumbsWrapper from './BreadcrumbsWrapper';
import { productTypes } from '../../config';

class BreadcrumbsContainer extends React.PureComponent {
    getBreadcrumbProps() {
        const {
            unbxdCore,
            root,
            separator,
            breadcrumbItemComponent,
            onBreadcrumbClick
        } = this.props;

        const {
            getBreadCrumbsList,
            deleteCategoryFilter,
            getBucketedFacets,
            getResults
        } = getFacetCoreMethods(unbxdCore);

        const multilevelFacets = getBucketedFacets();
        const breadCrumbsList = [];
        multilevelFacets.map(({ filterField }) => {
            const breadcrumbs = getBreadCrumbsList(filterField);
            breadCrumbsList.push(breadcrumbs);
        });

        const handleBreadCrumbClick = (currentItem) => {
            const { value, filterField, level } = currentItem;
            const categoryObject = { parent: filterField, level, name: value };
            const onFinish = () => {
                deleteCategoryFilter(categoryObject);
                getResults();
            };
            executeCallback(onBreadcrumbClick, [categoryObject], onFinish);
        };

        return {
            onBreadCrumbClick: handleBreadCrumbClick,
            breadCrumbsList,
            root,
            separator,
            breadcrumbItemComponent
        };
    }

    render() {
        const DefaultRender = BreadcrumbsWrapper;

        return conditionalRenderer(
            this.props.children,
            this.getBreadcrumbProps(),
            DefaultRender
        );
    }
}

BreadcrumbsContainer.propTypes = {
    unbxdCore: PropTypes.object.isRequired,
    root: PropTypes.oneOfType([PropTypes.element, PropTypes.node]),
    separator: PropTypes.node,
    breadcrumbItemComponent: PropTypes.element,
    productType: PropTypes.string.isRequired,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

export default BreadcrumbsContainer;
