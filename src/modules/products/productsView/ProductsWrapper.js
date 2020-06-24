import React from 'react';
import PropTypes from 'prop-types';

import GridView from './views/GridView';
import ListView from './views/ListView';
import { paginationTypes } from '../utils';
import { debounce } from '../../../common/utils';
import { productViewTypes as productViewTypesOptions, DEBOUNCE_TIME } from '../utils'

class ProductsWrapper extends React.PureComponent {

    constructor(props) {
        super(props);

        const { products } = this.props;
        this.state = {
            products,
            hasMoreResults: true
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

    loadMoreHandler = () => {
        const { getNextPage } = this.props;

        console.log("Loading new page");
        getNextPage();
    }

    componentDidMount() {
        const { paginationType } = this.props;
        if (paginationType === paginationTypes.INFINITE_SCROLL) {
            window.addEventListener('scroll', this.nextPageCallback);
        }
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
            (paginationType === paginationTypes.INFINITE_SCROLL || paginationType === paginationTypes.CLICK_N_SCROLL)) {

            return start === 0 ? { products: props.products } : { products: [...state.products, ...props.products] }
        }

        if (state.products !== props.products && paginationType === paginationTypes.FIXED_PAGINATION) {

            return { products: props.products }
        }

        return null;
    }

    render() {

        const { productViewType,
            onProductClick,
            perRow,
            productMap,
            productVariantMap,
            paginationType,
            showVariants,
            ProductItemComponent } = this.props;
        const { products, hasMoreResults } = this.state;

        const productViewsRender = <React.Fragment>{productViewType === productViewTypesOptions.GRID &&
            <GridView perRow={perRow}
                productMap={productMap}
                products={products}
                onProductClick={onProductClick}
                showVariants={showVariants}
                productVariantMap={productVariantMap}
                ProductItemComponent={ProductItemComponent}
            />}

            {productViewType === productViewTypesOptions.LIST &&
                <ListView productMap={productMap}
                    products={products}
                    onProductClick={onProductClick}
                    showVariants={showVariants}
                    productVariantMap={productVariantMap}
                    ProductItemComponent={ProductItemComponent}
                />}
        </React.Fragment>

        return (<React.Fragment>

            {productViewsRender}
            {paginationType === paginationTypes.CLICK_N_SCROLL &&
                hasMoreResults &&
                <div className='UNX-product-load-more' onClick={this.loadMoreHandler}>
                    Load more
            </div>}
        </React.Fragment>)
    }
}

ProductsWrapper.propTypes = {
    productViewType: PropTypes.string.isRequired,
    products: PropTypes.arrayOf(PropTypes.object).isRequired,
    onProductClick: PropTypes.func.isRequired,
    getNextPage: PropTypes.func.isRequired,
    perRow: PropTypes.number,
    productMap: PropTypes.object.isRequired,
    productVariantMap: PropTypes.object.isRequired,
    paginationType: PropTypes.string,
    heightDiffToTriggerNextPage: PropTypes.number,
    showVariants: PropTypes.bool.isRequired,
    ProductItemComponent: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
}

export default ProductsWrapper;
