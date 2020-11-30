import React from 'react';
import PropTypes from 'prop-types';

import { conditionalRenderer } from '../../common/utils';
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
            productType
        } = this.props;

        const {
            getBreadCrumbsList,
            deleteCategoryFilter,
            getSelectedBucketedFacet,
            getResults
        } = getFacetCoreMethods(unbxdCore);

        const selectedMultilevelFacet = getSelectedBucketedFacet();
        const breadCrumbsList = [];
        Object.keys(selectedMultilevelFacet).map((selectedFacetField) => {
            const breadcrumbs = getBreadCrumbsList(selectedFacetField);
            breadCrumbsList.push(breadcrumbs);
        });

        const handleBreadCrumbClick = (currentItem) => { 
            const { value, filterField, level } = currentItem;
            const categoryObject = { parent: filterField, level, name: value };
            const { setCategoryId } = unbxdCore;
            if (
                productType === productTypes.CATEGORY &&
                typeof setCategoryId === 'function'
            ) {
                const getUpdatedResults = setCategoryId(
                    categoryObject,
                    unbxdCore
                );
                if (getUpdatedResults) {
                    getResults();
                }
            } else {
                deleteCategoryFilter(categoryObject);
                getResults();
            }
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
    unbxdCoreStatus: PropTypes.string.isRequired,
    helpers: PropTypes.object.isRequired,
    root: PropTypes.oneOfType([PropTypes.element, PropTypes.node]),
    separator: PropTypes.node,
    breadcrumbItemComponent: PropTypes.element,
    productType: PropTypes.string.isRequired
};

export default BreadcrumbsContainer;
