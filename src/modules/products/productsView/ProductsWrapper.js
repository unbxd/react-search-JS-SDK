import React from 'react';
import PropTypes from 'prop-types';

import GridView from './views/GridView';
import ListView from './views/ListView';
import { paginationTypes, getProductPids } from '../utils';
import { debounce } from '../../../common/utils';
import { productViewTypes as productViewTypeOptions, DEBOUNCE_TIME } from '../utils';
import { searchStatus } from '../../../config';
import { trackProductImpressions } from '../../analytics';

class ProductsWrapper extends React.PureComponent {

    constructor(props) {
        super(props);

        const { products } = this.props;
        this.state = {
            products,
            hasMoreResults: true,
            start: 0
        }
    }

    nextPageCallback = debounce(() => {

        const { getNextPage, heightDiffToTriggerNextPage } = this.props;

        const documentHeight = document.documentElement.offsetHeight;
        const scrollHeight = (window.innerHeight + document.documentElement.scrollTop);

        if (documentHeight - scrollHeight < heightDiffToTriggerNextPage) {
            console.log("Loading new page");
            getNextPage();
        }

    }, DEBOUNCE_TIME);
    //Does it make sense to add DEBOUNCE_TIME to component props

    loadMoreProducts = () => {
        const { getNextPage } = this.props;

        console.log("Loading new page");
        getNextPage();
    }


    componentDidMount() {

        const { paginationType } = this.props;
        if (paginationType === paginationTypes.INFINITE_SCROLL) {
            window.addEventListener('scroll', this.nextPageCallback);
        }

        const { query, productIdAttribute, products } = this.props;
        trackProductImpressions(query, getProductPids(products, productIdAttribute));
    }

    componentDidUpdate() {

        const { paginationType } = this.props;
        if (this.props.products.length === 0 && paginationType === paginationTypes.INFINITE_SCROLL) {
            window.removeEventListener('scroll', this.nextPageCallback);
        }

    }

    componentWillUnmount() {

        const { paginationType } = this.props;
        if (paginationType === paginationTypes.INFINITE_SCROLL) {
            window.removeEventListener('scroll', this.nextPageCallback);
        }
    }

    componentDidUpdate(prevProps) {

        const { paginationType, products, start, query, productIdAttribute } = this.props;

        if (products.length === 0) {
            if (paginationType === paginationTypes.INFINITE_SCROLL) {
                return;
            }

            if (paginationType === paginationTypes.CLICK_N_SCROLL) {
                this.setState({ hasMoreResults: false });
            }
        }

        if (prevProps.start !== start &&
            (paginationType === paginationTypes.INFINITE_SCROLL ||
                paginationType === paginationTypes.CLICK_N_SCROLL)) {

            trackProductImpressions(query, getProductPids(products, productIdAttribute));
            start === 0 ? this.setState({ products: products }) :
                this.setState({ products: [...prevProps.products, ...products], start });
        }

        if (prevProps.start !== start &&
            prevProps.products !== products &&
            paginationType === paginationTypes.FIXED_PAGINATION) {

            trackProductImpressions(query, getProductPids(products, productIdAttribute));
            this.setState({ products: products, start });
        }
    }

    render() {

        const { productViewType,
            onProductClick,
            perRow,
            productAttributes,
            variantAttributes,
            paginationType,
            showVariants,
            ProductItemComponent,
            showSwatches,
            swatchAttributes,
            groupBy,
            SwatchItemComponent,
            LoadMoreComponent,
            unbxdCoreStatus,
            LoaderComponent,
            showLoader } = this.props;
        const { products, hasMoreResults } = this.state;

        const displayClickNScrollTrigger = paginationType === paginationTypes.CLICK_N_SCROLL &&
            hasMoreResults && unbxdCoreStatus === searchStatus.READY;
        const displayLoader = unbxdCoreStatus === searchStatus.LOADING && showLoader;

        const viewProps = {
            perRow,
            productAttributes,
            products,
            onProductClick,
            showVariants,
            variantAttributes,
            ProductItemComponent,
            showSwatches,
            swatchAttributes,
            groupBy,
            SwatchItemComponent,
            productViewType
        }

        const productViewsRender = <React.Fragment>
            {productViewType === productViewTypeOptions.GRID &&
                <GridView {...viewProps} />}

            {productViewType === productViewTypeOptions.LIST &&
                <ListView {...viewProps} />}
        </React.Fragment>

        return (<React.Fragment>

            {productViewsRender}

            {displayClickNScrollTrigger &&
                (LoadMoreComponent ? <LoadMoreComponent loadMoreProducts={this.loadMoreProducts} />
                    : <div className='UNX-product-load-more' onClick={this.loadMoreProducts}>
                        Load more
                </div>)}

            {displayLoader && <LoaderComponent />}
        </React.Fragment>)
    }
}

ProductsWrapper.propTypes = {
    perRow: PropTypes.number,
    productViewType: PropTypes.string.isRequired,
    products: PropTypes.arrayOf(PropTypes.object).isRequired,
    onProductClick: PropTypes.func.isRequired,
    getNextPage: PropTypes.func.isRequired,
    productAttributes: PropTypes.object.isRequired,
    variantAttributes: PropTypes.object.isRequired,
    paginationType: PropTypes.string,
    heightDiffToTriggerNextPage: PropTypes.number,
    showVariants: PropTypes.bool.isRequired,
    ProductItemComponent: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
    showSwatches: PropTypes.bool,
    swatchAttributes: PropTypes.object,
    groupBy: PropTypes.string,
    SwatchItemComponent: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
}

export default ProductsWrapper;
