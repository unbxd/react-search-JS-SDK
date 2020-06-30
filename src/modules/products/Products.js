import React from 'react';
import AppContext from '../../common/context'
import { ProductContextProvider } from './context'

import PropTypes from 'prop-types';

import ViewTypes from './viewTypes/ViewTypes';
import ProductsView from './productsView/ProductsView';
import { conditionalRenderer, isContext } from '../../common/utils';
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
            isContext(Products.displayName);
        }

        const { helpers: { setProductConfiguration } } = this.context;

        const { pageSize,
            productAttributes,
            showVariants,
            variantsCount,
            variantAttributes,
            paginationType,
            groupBy } = this.props

        //generate required fields here based on productAttributes and variantAttributes
        const requiredFields = Object.values(productAttributes);
        const variantRequiredFields = Object.values(variantAttributes);

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
            isContext(Products.displayName);
        }

        const { unbxdCore, unbxdCoreStatus, helpers: { trackActions } } = this.context;
        const { ZeroResultsComponent,
            perRow,
            pageSize,
            paginationType,
            productAttributes,
            variantAttributes,
            productViewTypes,
            heightDiffToTriggerNextPage,
            showVariants,
            LoaderComponent,
            showLoader,
            onProductClick: onProductClickCB,
            onZeroResults,
            ProductItemComponent,
            productViewDisplayType,
            ProductsViewListItemComponent,
            showSwatches,
            swatchAttributes,
            groupBy,
            SwatchItemComponent,
            productIdAttribute } = this.props;

        const getSearchResults = unbxdCore.getSearchResults.bind(unbxdCore);
        const setPageStart = unbxdCore.setPageStart.bind(unbxdCore);
        const getPaginationInfo = unbxdCore.getPaginationInfo.bind(unbxdCore);
        const getResults = unbxdCore.getResults.bind(unbxdCore);
        const getProductByPropValue = unbxdCore.getProductByPropValue.bind(unbxdCore);

        const query = unbxdCore.getSearchQuery() || "";

        const onViewToggle = (event) => {
            const productViewType = event.target.dataset.viewtype || event.target.value;;

            trackActions({ type: 'PRODUCT_VIEW_TYPE', data: { productViewType } });
            this.setState({ productViewType });

        }

        //Get next page method
        const getNextPage = () => {

            const { currentPage } = getPaginationInfo();
            const newStart = currentPage === 0 ? pageSize : (currentPage * pageSize);

            setPageStart(newStart);
            getResults();
            trackActions({ type: 'NEXT_PAGE', data: { paginationType } });
        }

        const onProductClick = (event) => {

            this.props.onProductClick && this.props.onProductClick();

            const productUniqueId = event.target.dataset.uniqueid;
            const prank = event.target.dataset.prank;
            const clickedProduct = getProductByPropValue(productIdAttribute, productUniqueId);
            trackProductClick(clickedProduct[productIdAttribute], prank);
        }

        //onClick for products
        const getProductsProp = ({ onClick, ...props }) => ({
            onClick: () => {
                onProductClick();
                onClick();
            },
            getSearchResults,
            getNextPage,
            ...props
        })

        const data = {
            unbxdCoreStatus,
            perRow,
            paginationType,
            productAttributes,
            variantAttributes,
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
            onViewToggle: onViewToggle,
            getProductsProp,
            getNextPage,
            onProductClick,
            getSearchResults,
            getNextPage,
            LoaderComponent,
            onProductClickCB,
            onZeroResults,
            ProductItemComponent,
            ProductsViewListItemComponent,
            SwatchItemComponent,
        }

        return { data, helpers }

    }

    render() {
        const { LoaderComponent } = this.props;

        const DefaultRender = <React.Fragment>
            <ViewTypes />
            <ProductsView />
        </React.Fragment>;
        const LoaderRender = <LoaderComponent />;


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
    perRow: 5,
    pageSize: 10,
    productViewTypes: ["GRID"],
    productAttributes: {},
    variantAttributes: {},
    paginationType: 'FIXED_PAGINATION',
    heightDiffToTriggerNextPage: 100,
    showVariants: false,
    LoaderComponent: defaultLoader,
    showLoader: true,
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
    ProductsViewListItemComponent: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
    /**
    * Mapping of catalog Product fields to SDK Product fields.
    */
    productAttributes: PropTypes.object.isRequired,
    /**      
    *  Component to be shown in case of zero results.
    */
    ZeroResultsComponent: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
    /**
    * Required pagination type. Possible options are `INFINITE_SCROLL`, `CLICK_N_SCROLL` and `FIXED_PAGINATION`.
    */
    paginationType: PropTypes.string,
    /**
    * Height difference to trigger for next page in case of paginationType `INFINITE_SCROLL`.
    */
    heightDiffToTriggerNextPage: PropTypes.number,
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
    variantAttributes: PropTypes.object,
    /**
    * Custom Product card component
    */
    ProductCardComponent: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
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
    * Custom product item component
    */
    ProductItemComponent: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
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
    * Unique attribute of the product
    */
    productIdAttribute: PropTypes.string,
}

export default Products;
