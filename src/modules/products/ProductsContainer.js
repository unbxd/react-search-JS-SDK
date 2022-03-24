import React from 'react';
import PropTypes from 'prop-types';

import { conditionalRenderer } from '../../common/utils';
import ProductsWrapper from './productsWrapper';

class ProductsContainer extends React.PureComponent {
    componentDidMount() {
        const {
            pageSize,
            attributesMap = {},
            showVariants,
            variantsCount,
            variantAttributesMap = {},
            swatchAttributesMap = {},
            paginationType,
            groupBy,
            helpers: { setProductConfiguration }
        } = this.props;

        // generate required fields here based on attributesMap and variantAttributesMap
        const requiredFields = Object.values(attributesMap);
        const variantFields = [
            ...Object.values(variantAttributesMap),
            ...Object.values(swatchAttributesMap)
        ];
        const variantRequiredFields = [...new Set(variantFields)];

        // Set the main config
        // Do not set pageSize if pagination type is FIXED_SCROLLING
        setProductConfiguration({
            pageSize,
            requiredFields,
            showVariants,
            variantsCount,
            variantRequiredFields,
            paginationType,
            groupBy
        });
    }

    getProductProps() {
        const {
            unbxdCore,
            unbxdCoreStatus,
            helpers: { getAnalytics },
            zeroResultsComponent,
            perRow,
            pageSize,
            paginationType,
            heightDiffToTriggerNextPage,
            loaderComponent,
            showLoader,
            onProductClick: onProductClickCB,
            loadMoreComponent,
            onZeroResults,
            productItemComponent,
            productIdAttribute,
            attributesMap = {},
            showVariants = false,
            groupBy,
            variantAttributesMap = {},
            showSwatches,
            swatchAttributesMap = {},
            swatchItemComponent,
            viewType,
            sort,
            priceUnit
        } = this.props;

        const setPageStart = unbxdCore.setPageStart.bind(unbxdCore);
        const getPaginationInfo = unbxdCore.getPaginationInfo.bind(unbxdCore);
        const getResults = unbxdCore.getResults.bind(unbxdCore);
        const getProductByPropValue = unbxdCore.getProductByPropValue.bind(
            unbxdCore
        );
        const { trackProductClick } = getAnalytics();

        const query = unbxdCore.getSearchQuery() || '';
        const { numberOfProducts = 0, products = [], start = 0 } =
            unbxdCore.getSearchResults() || {};

        const getNextPage = () => {
            const { currentPage } = getPaginationInfo();
            const paginationInfo = unbxdCore.getPaginationInfo();
            const currentPageSize =
                (paginationInfo && paginationInfo.rows) || pageSize;
            const newStart =
                currentPage === 0
                    ? currentPageSize
                    : currentPage * currentPageSize;

            setPageStart(newStart);
            getResults();
        };

        const onProductClick = (currentItem) => {
            const productUniqueId = currentItem[productIdAttribute];
            if (productUniqueId) {
                const { prank } = currentItem;
                const clickedProduct = getProductByPropValue(
                    productIdAttribute,
                    productUniqueId
                );

                if (onProductClickCB) {
                    if (onProductClickCB(clickedProduct)) {
                        trackProductClick(
                            clickedProduct[productIdAttribute],
                            prank
                        );
                    }
                } else {
                    trackProductClick(
                        clickedProduct[productIdAttribute],
                        prank
                    );
                }
            }
        };

        const getOnProductsClickProps = ({ onClick, ...props }) => ({
            onClick: () => {
                onProductClick();
                onClick();
            },
            ...props
        });

        const data = {
            unbxdCoreStatus,
            perRow,
            paginationType,
            attributesMap,
            variantAttributesMap,
            heightDiffToTriggerNextPage,
            showVariants,
            showLoader,
            showSwatches,
            swatchAttributesMap,
            groupBy,
            query,
            productIdAttribute,
            viewType,
            pageSize,
            sort,
            numberOfProducts,
            products,
            start,
            priceUnit
        };

        const helpers = {
            zeroResultsComponent,
            getOnProductsClickProps,
            getNextPage,
            onProductClick,
            loaderComponent,
            onZeroResults,
            productItemComponent,
            swatchItemComponent,
            loadMoreComponent,
            getAnalytics
        };

        return { ...data, ...helpers };
    }

    render() {
        const DefaultRender = ProductsWrapper;
        const LoaderRender = null;
        this.props.onResultsLoaded(this.props.unbxdCore)
        return conditionalRenderer(
            this.props.children,
            this.getProductProps(),
            DefaultRender,
            LoaderRender
        );
    }
}

ProductsContainer.propTypes = {
    unbxdCore: PropTypes.object.isRequired,
    unbxdCoreStatus: PropTypes.string.isRequired,
    helpers: PropTypes.object.isRequired,
    viewType: PropTypes.string,
    perRow: PropTypes.number,
    pageSize: PropTypes.number,
    paginationType: PropTypes.string,
    heightDiffToTriggerNextPage: PropTypes.number,
    loadMoreComponent: PropTypes.element,
    productIdAttribute: PropTypes.string,
    attributesMap: PropTypes.object.isRequired,
    showVariants: PropTypes.bool,
    variantsCount: PropTypes.number,
    variantAttributesMap: PropTypes.object,
    showLoader: PropTypes.bool,
    loaderComponent: PropTypes.element,
    onProductClick: PropTypes.func,
    onZeroResults: PropTypes.func,
    showSwatches: PropTypes.bool,
    groupBy: PropTypes.string,
    swatchAttributesMap: PropTypes.object,
    swatchItemComponent: PropTypes.element,
    productItemComponent: PropTypes.element,
    zeroResultsComponent: PropTypes.element,
    priceUnit: PropTypes.string.isRequired
};

export default ProductsContainer;
