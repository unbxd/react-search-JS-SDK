import React from 'react';
import AppContext from '../../common/context'
import { ProductContextProvider } from './context'

import PropTypes from 'prop-types';

import ViewTypes from './ViewTypes';
import ProductsView from './ProductsView';
import { conditionalRenderer, isContext } from '../../common/utils';
import { Loader as defaultLoader } from '../../components'
import { getProductViewType } from './utils'


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

        const { pageSize, productMap, showVariants,
            variantsCount, productVariantMap, paginationType } = this.props

        //generate required fields here based on productMap and productVariantMap
        const requiredFields = Object.values(productMap);
        const variantRequiredFields = Object.values(productVariantMap);

        //Set the main config
        //Do not set pageSize if pagination type is FIXED_SCROLLING
        setProductConfiguration({
            pageSize, requiredFields, showVariants, variantsCount, variantRequiredFields, paginationType
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
            productMap,
            productVariantMap,
            productViewTypes,
            heightDiffToTriggerNextPage,
            showVariants,
            ProductCardComponent,
            LoaderComponent,
            showLoader,
            onProductClick: onProductClickCB,
            onZeroResults } = this.props;

        const getSearchResults = unbxdCore.getSearchResults.bind(unbxdCore);
        const setPageStart = unbxdCore.setPageStart.bind(unbxdCore);
        const getPaginationInfo = unbxdCore.getPaginationInfo.bind(unbxdCore);
        const getResults = unbxdCore.getResults.bind(unbxdCore);


        const onViewToggle = (event) => {
            const productViewType = event.target.dataset.viewtype;

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
            trackActions({ type: 'PRODUCT_CLICK', data: { uniqueId: event.target.dataset.uniqueid } });
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
            productMap,
            productVariantMap,
            productViewTypes,
            heightDiffToTriggerNextPage,
            showVariants,
            showLoader,
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
            ProductCardComponent,
            LoaderComponent,
            onProductClickCB,
            onZeroResults
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
    productMap: {},
    productVariantMap: {},
    paginationType: 'FIXED_PAGINATION',
    heightDiffToTriggerNextPage: 50,
    showVariants: false,
    LoaderComponent: defaultLoader,
    showLoader: true
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
    * Mapping of catalog Product fields to SDK Product fields.
    */
    productMap: PropTypes.object.isRequired,
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
    productVariantMap: PropTypes.object,
    /**
    * Custom Product card component
    */
    ProductCardComponent: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
    /**
    * Custom loader component
    */
    LoaderComponent: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
    /**
    * Should loader be shown
    */
    showLoader: PropTypes.bool,
    /**
    * Callback function triggered on click of a product.
    */
    onProductClick: PropTypes.func,
    /**
    * Callback function triggered on zero results.
    */
    onZeroResults: PropTypes.func
}

export default Products;
