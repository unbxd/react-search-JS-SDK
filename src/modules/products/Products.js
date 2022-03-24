import React from 'react';
import PropTypes from 'prop-types';

import ProductsContainer from './ProductsContainer';
import { AppContextConsumer } from '../../common/context';
import { hasUnbxdSearchWrapperContext } from '../../common/utils';

/**
 * Component to manage products.
 * Products also manages the pagination options for the search results here.
 */
const Products = (props) => {
    return (
        <AppContextConsumer>
            {(appState) => {
                if (appState === undefined) {
                    hasUnbxdSearchWrapperContext(Products.displayName);
                }

                const {
                    unbxdCore,
                    unbxdCoreStatus,
                    helpers,
                    unbxdState,
                    priceUnit
                } = appState;
                const { viewType, pageSize, sort } = unbxdState;

                return (
                    <ProductsContainer
                        unbxdCore={unbxdCore}
                        unbxdCoreStatus={unbxdCoreStatus}
                        helpers={helpers}
                        viewType={viewType}
                        pageSize={pageSize}
                        sort={sort}
                        priceUnit={priceUnit}
                        {...props}
                    />
                );
            }}
        </AppContextConsumer>
    );
};

Products.displayName = 'Products';

Products.defaultProps = {
    perRow: 4,
    pageSize: 10,
    variantsCount: 0,
    paginationType: 'FIXED_PAGINATION',
    heightDiffToTriggerNextPage: 300,
    showLoader: false,
    productIdAttribute: 'uniqueId',
    groupBy: '',
    variantAttributesMap: {},
    onResultsLoaded:()=>{}
};

Products.propTypes = {
    /**
     * Number of products to be shown per row.
     */
    perRow: PropTypes.number,
    /**
     * Required pagination type. Possible options are `INFINITE_SCROLL`, `CLICK_N_SCROLL` and `FIXED_PAGINATION`.
     */
    paginationType: PropTypes.string,
    /**
     * Height difference to trigger for next page in case of paginationType `INFINITE_SCROLL`.
     */
    heightDiffToTriggerNextPage: PropTypes.number,
    /**
     * Custom load more component instance
     */
    loadMoreComponent: PropTypes.element,
    /**
     * Unique attribute of the product
     */
    productIdAttribute: PropTypes.string,
    /**
     * Mapping of catalog Product fields to SDK Product fields.
     */
    attributesMap: PropTypes.object.isRequired,
    /**
     * Show variants to a product.
     */
    showVariants: PropTypes.bool,
    /**
     * Number of variants to fetch.
     */
    variantsCount: PropTypes.number,
    /**
     * Mapping of catalog Product variant fields to SDK Product variant fields.
     */
    variantAttributesMap: PropTypes.object,
    /**
     * Should loader be shown
     */
    showLoader: PropTypes.bool,
    /**
     * Custom loader component instance
     */
    loaderComponent: PropTypes.element,
    /**
     * Callback function triggered on click of a product.
     */
    onProductClick: PropTypes.func,
    /**
     * Callback function triggered on zero results.
     */
    onZeroResults: PropTypes.func,
    /**
     * Display swatches
     */
    showSwatches: PropTypes.bool,
    /**
     * Group variants by the attribute
     */
    groupBy: PropTypes.string,
    /**
     * Swatch attributes that change on click on of the swatch
     */
    swatchAttributesMap: PropTypes.object,
    /**
     * Custom swatch component instance
     */
    swatchItemComponent: PropTypes.element,
    /**
     * Custom product item component instance
     */
    productItemComponent: PropTypes.element,
    /**
     *  Custom zero result component instance
     */
    zeroResultsComponent: PropTypes.element,
    /**
     *  callback on each new results load
     */
     onResultsLoaded: PropTypes.func
};

export default Products;
