import React from 'react';
import AppContext from '../../common/context'
import { ProductContextProvider } from './context'

import PropTypes from 'prop-types';

import ViewTypes from './ViewTypes';
import ProductsView from './ProductsView';
import { conditionalRenderer } from '../../common/utils';
import { getProductViewType } from './utils'

class Products extends React.PureComponent {

    ProductContext = React.createContext();

    static contextType = AppContext;

    static ViewTypes = ViewTypes;
    static ProductsView = ProductsView;

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

        const { unbxdCore, helpers: { trackActions } } = this.context;
        const { ZeroResultsComponent,
            perRow,
            pageSize,
            paginationType,
            productMap,
            productVariantMap,
            productViewTypes,
            heightDiffToTriggerNextPage } = this.props

        const getSearchResults = unbxdCore.getSearchResults.bind(unbxdCore);
        const setPageStart = unbxdCore.setPageStart.bind(unbxdCore);
        const getPaginationInfo = unbxdCore.getPaginationInfo.bind(unbxdCore);
        const getResults = unbxdCore.getResults.bind(unbxdCore);


        const onViewToggle = (event) => {
            const productViewType = event.target.dataset.viewtype;

            trackActions({ type: 'PRODUCT_VIEW_TYPE', data: { productViewType } });
            this.setState({ productViewType })

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
            perRow,
            paginationType, productMap, productVariantMap, productViewTypes,
            heightDiffToTriggerNextPage, ...this.state
        };
        const helpers = {
            ZeroResultsComponent,
            onViewToggle: onViewToggle,
            getProductsProp,
            getNextPage,
            onProductClick,
            getSearchResults,
            getNextPage
        }
        return { data, helpers }

    }

    render() {
        const DefaultRender = <React.Fragment>
            <ViewTypes />
            <ProductsView />
        </React.Fragment>

        return (<ProductContextProvider value={this.getProductProps()}>
            {conditionalRenderer(this.props.children, this.getProductProps(), DefaultRender)}
        </ProductContextProvider>)
    }
}

Products.defaultProps = {
    perRow: 5,
    pageSize: 10,
    productMap: { productName: "title", uniqueId: "uniqueId", imageUrl: "imageUrl" },
    ZeroResultsComponent: false,
    paginationType: 'FIXED_PAGINATION',
    heightDiffToTriggerNextPage: 50,
    showVariants: false,
}

Products.propTypes = {
    perRow: PropTypes.number,
    pageSize: PropTypes.number,
    productMap: PropTypes.object.isRequired,
    ZeroResultsComponent: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
    paginationType: PropTypes.string,
    heightDiffToTriggerNextPage: PropTypes.number,
    showVariants: PropTypes.bool,
    variantsCount: PropTypes.number,
    productVariantMap: PropTypes.object,
}

export default Products;
