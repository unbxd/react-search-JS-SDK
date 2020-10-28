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
            Root,
            separator,
            BreadcrumbItemComponent,
            productType,
        } = this.props;

        const {
            getBreadCrumbsList,
            deleteCategoryFilter,
            getResults,
        } = getFacetCoreMethods(unbxdCore);

        const breadCrumbsList = getBreadCrumbsList();

        const handleBreadCrumbClick = (currentItem) => {
            const { value, filterField, level } = currentItem;
            const categoryObject = { parent: filterField, level, name: value };
            if (productType === productTypes.CATEGORY) {
                unbxdCore.setCategoryId(categoryObject, unbxdCore);
            } else {
                deleteCategoryFilter(categoryObject);
            }

            getResults();
        };

        return {
            onBreadCrumbClick: handleBreadCrumbClick,
            breadCrumbsList,
            Root,
            separator,
            BreadcrumbItemComponent,
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
    Root: PropTypes.oneOfType([
        PropTypes.element,
        PropTypes.func,
        PropTypes.node,
    ]),
    separator: PropTypes.node,
    BreadcrumbItemComponent: PropTypes.oneOfType([
        PropTypes.element,
        PropTypes.func,
    ]),
    productType: PropTypes.string.isRequired,
};

export default BreadcrumbsContainer;
