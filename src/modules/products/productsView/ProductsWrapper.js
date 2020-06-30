import React from 'react';
import PropTypes from 'prop-types';

import GridView from './views/GridView';
import ListView from './views/ListView';
import { paginationTypes } from '../utils';
import { debounce } from '../../../common/utils';
import { productViewTypes as productViewTypesOptions, DEBOUNCE_TIME } from '../utils';
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

        //get the pids
        //get the search query
        const { query, products, productIdAttribute } = this.props;
        const pids = products.map((product) => {
            return product[productIdAttribute]
        })
        trackProductImpressions(query, pids);
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

    static getDerivedStateFromProps(props, state) {

        const { paginationType, start } = props;

        if (props.products.length === 0) {
            if (paginationType === paginationTypes.INFINITE_SCROLL) {
                return null;
            }

            if (paginationType === paginationTypes.CLICK_N_SCROLL) {
                return { hasMoreResults: false }
            }
        }

        if (state.products !== props.products &&
            state.start !== props.start &&
            (paginationType === paginationTypes.INFINITE_SCROLL ||
                paginationType === paginationTypes.CLICK_N_SCROLL)) {

            return start === 0 ? { products: props.products } :
                { products: [...state.products, ...props.products], start: props.start }
        }

        if (state.products !== props.products && paginationType === paginationTypes.FIXED_PAGINATION) {

            return { products: props.products, start: props.start }
        }

        return null;
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


        const productViewsRender = <React.Fragment>{productViewType === productViewTypesOptions.GRID &&
            <GridView perRow={perRow}
                productAttributes={productAttributes}
                products={products}
                onProductClick={onProductClick}
                showVariants={showVariants}
                variantAttributes={variantAttributes}
                ProductItemComponent={ProductItemComponent}
                showSwatches={showSwatches}
                swatchAttributes={swatchAttributes}
                groupBy={groupBy}
                SwatchItemComponent={SwatchItemComponent}
            />}

            {productViewType === productViewTypesOptions.LIST &&
                <ListView productAttributes={productAttributes}
                    products={products}
                    onProductClick={onProductClick}
                    showVariants={showVariants}
                    variantAttributes={variantAttributes}
                    ProductItemComponent={ProductItemComponent}
                    showSwatches={showSwatches}
                    swatchAttributes={swatchAttributes}
                    groupBy={groupBy}
                    SwatchItemComponent={SwatchItemComponent}
                />}
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
    productViewType: PropTypes.string.isRequired,
    products: PropTypes.arrayOf(PropTypes.object).isRequired,
    onProductClick: PropTypes.func.isRequired,
    getNextPage: PropTypes.func.isRequired,
    perRow: PropTypes.number,
    productAttributes: PropTypes.object.isRequired,
    variantAttributes: PropTypes.object.isRequired,
    paginationType: PropTypes.string,
    heightDiffToTriggerNextPage: PropTypes.number,
    showVariants: PropTypes.bool.isRequired,
    ProductItemComponent: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
}

export default ProductsWrapper;
