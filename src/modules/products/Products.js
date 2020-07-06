import React from 'react';
import PropTypes from 'prop-types';

import AppContext from '../../common/context'
import { ProductContextProvider } from './context'
import ViewTypes from './viewTypes/ViewTypes';
import ProductsView from './productsView/ProductsView';
import { conditionalRenderer, hasUnbxdSearchWrapperContext } from '../../common/utils';
import { Loader as defaultLoader } from '../../components'
import { getProductViewType } from './utils';
import { trackProductClick } from '../analytics';


/**
 * Component to render the search products. 
 * Products supports Product View types `LIST` and `GRID` out of the box. 
 * Products also manages the pagination options for the search results here.
 */
export class Products extends React.PureComponent {

    constructor(props) {
        super(props);

        const { productViewTypes } = this.props

        //Lets fallback to grid view
        const productViewType = getProductViewType(productViewTypes)[0];

        this.state = {
            productViewType,
        }
    }

    componentDidMount() {

        if (this.context === undefined) {
            hasUnbxdSearchWrapperContext(Products.displayName);
        }

        const { helpers: { setProductConfiguration } } = this.context;

        const { pageSize,
            attributesMap,
            showVariants,
            variantsCount,
            variantAttributesMap,
            paginationType,
            groupBy } = this.props;

        //generate required fields here based on attributesMap and variantAttributesMap
        const requiredFields = Object.values(attributesMap);
        const variantRequiredFields = Object.values(variantAttributesMap);

        //Set the main config
        //Do not set pageSize if pagination type is FIXED_SCROLLING
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

        if (this.context === undefined) {
            hasUnbxdSearchWrapperContext(Products.displayName);
        }

        const { unbxdCore, unbxdCoreStatus, helpers: { trackActions } } = this.context;
        const { ZeroResultsComponent,
            perRow,
            pageSize,
            paginationType,
            productViewTypes,
            productViewDisplayType,
            heightDiffToTriggerNextPage,
            LoaderComponent,
            showLoader,
            onProductClick: onProductClickCB,
            LoadMoreComponent,
            onZeroResults,
            ProductItemComponent,
            ProductsViewItemComponent,
            productIdAttribute,
            attributesMap,
            showVariants,
            groupBy,
            variantAttributesMap,
            showSwatches,
            swatchAttributes,
            SwatchItemComponent } = this.props;

        const getSearchResults = unbxdCore.getSearchResults.bind(unbxdCore);
        const setPageStart = unbxdCore.setPageStart.bind(unbxdCore);
        const getPaginationInfo = unbxdCore.getPaginationInfo.bind(unbxdCore);
        const getResults = unbxdCore.getResults.bind(unbxdCore);
        const getProductByPropValue = unbxdCore.getProductByPropValue.bind(unbxdCore);

        const query = unbxdCore.getSearchQuery() || "";

        const onViewToggle = (event) => {

            const productViewType = event.target.dataset.viewtype || event.target.value;;

            this.setState({ productViewType });
        }

        const getNextPage = () => {

            const { currentPage } = getPaginationInfo();
            const newStart = currentPage === 0 ? pageSize : (currentPage * pageSize);

            setPageStart(newStart);
            getResults();
        }

        const onProductClick = (event) => {

            const productUniqueId = event.target.dataset.uniqueid;
            if (productUniqueId) {
                const prank = event.target.dataset.prank;
                const clickedProduct = getProductByPropValue(productIdAttribute, productUniqueId);

                if (onProductClickCB) {

                    if (onProductClickCB(clickedProduct)) {

                        trackProductClick(clickedProduct[productIdAttribute], prank);
                    } else {

                        event.preventDefault();
                    }
                } else {

                    trackProductClick(clickedProduct[productIdAttribute], prank);
                }

            }

        }

        const getOnProductsClickProps = ({ onClick, ...props }) => ({
            onClick: () => {
                onProductClick();
                onClick();
            },
            ...props
        })

        const data = {
            unbxdCoreStatus,
            perRow,
            paginationType,
            attributesMap,
            variantAttributesMap,
            productViewTypes,
            heightDiffToTriggerNextPage,
            showVariants,
            showLoader,
            productViewDisplayType,
            showSwatches,
            swatchAttributes,
            groupBy,
            query,
            productIdAttribute,
            ...this.state
        };
        const helpers = {
            ZeroResultsComponent,
            onViewToggle,
            getOnProductsClickProps,
            getNextPage,
            onProductClick,
            getSearchResults,
            getNextPage,
            LoaderComponent,
            onZeroResults,
            ProductItemComponent,
            ProductsViewItemComponent,
            SwatchItemComponent,
            LoadMoreComponent
        }

        return { data, helpers }

    }

    render() {

        const DefaultRender = <React.Fragment>
            <ViewTypes />
            <ProductsView />
        </React.Fragment>;
        const LoaderRender = null;


        return (<ProductContextProvider value={this.getProductProps()}>
            {conditionalRenderer(this.props.children, this.getProductProps(), DefaultRender, LoaderRender)}
        </ProductContextProvider>)
    }
}

Products.contextType = AppContext;
Products.ViewTypes = ViewTypes;
Products.ProductsView = ProductsView;
Products.displayName = "Products";

Products.defaultProps = {
    perRow: 4,
    pageSize: 10,
    productViewTypes: ["GRID"],
    attributesMap: {},
    variantAttributesMap: {},
    paginationType: 'FIXED_PAGINATION',
    heightDiffToTriggerNextPage: 100,
    showVariants: false,
    LoaderComponent: defaultLoader,
    showLoader: false,
    productViewDisplayType: "DROPDOWN",
    productIdAttribute: 'uniqueId',
}

Products.propTypes = {
    /**
    * Number of products to be shown per row.
    */
    perRow: PropTypes.number,
    /**
    * Number of products to be loaded on a page.
    */
    pageSize: PropTypes.number,
    /**
    * Required pagination type. Possible options are `INFINITE_SCROLL`, `CLICK_N_SCROLL` and `FIXED_PAGINATION`.
    */
    paginationType: PropTypes.string,
    /**
     * Height difference to trigger for next page in case of paginationType `INFINITE_SCROLL`.
     */
    heightDiffToTriggerNextPage: PropTypes.number,
    /**
     * Custom load more component for CLICK_N_SCROLL
     */
    LoadMoreComponent: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
    /**
    * Required ProductViewType.Possible options are`GRID` and `LIST`.
    */
    productViewTypes: PropTypes.arrayOf(PropTypes.string),
    /**
    * Required ProductViewType Display type.Possible options are`LIST` and `DROPDOWN`.
    */
    productViewDisplayType: PropTypes.string,
    /**
    * Custom `LIST` item component for product views.
    */
    ProductsViewItemComponent: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
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
    * Custom loader component
    */
    LoaderComponent: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
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
    swatchAttributes: PropTypes.object,
    /**
    * Custom swatch component
    */
    SwatchItemComponent: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
    /**
    * Custom product item component
    */
    ProductItemComponent: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
    /**      
    *  Component to be shown in case of zero results.
    */
    ZeroResultsComponent: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
}

export default Products;
