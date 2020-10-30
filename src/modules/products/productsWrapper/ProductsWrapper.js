import React, { createRef } from 'react';
import PropTypes from 'prop-types';

import GridView from './views/GridView';
import ListView from './views/ListView';
import NoProducts from './NoProducts';
import { getProductPids } from '../utils';
import { paginationTypes } from '../../../config';
import { debounce } from '../../../common/utils';
import { DEBOUNCE_TIME } from '../utils';
import { searchStatus, viewTypes } from '../../../config';
import { trackProductImpressions } from '../../analytics';

class ProductsWrapper extends React.PureComponent {
  constructor(props) {
    super(props);

    const { products } = this.props;
    this.state = {
      products,
      hasMoreResults: true,
      start: 0
    };

    this.productsContainerRef = createRef();
  }

  nextPageCallback = debounce(() => {
    const { getNextPage, heightDiffToTriggerNextPage } = this.props;

    const productContainerHeight = this.productsContainerRef.current
      .clientHeight;
    const documentHeight = document.documentElement.offsetHeight;
    const scrollHeight =
      window.innerHeight + document.documentElement.scrollTop;

    if (
      documentHeight - scrollHeight < heightDiffToTriggerNextPage ||
      (scrollHeight > productContainerHeight)
    ) {
      getNextPage();
    }
  }, DEBOUNCE_TIME);
  //Does it make sense to add DEBOUNCE_TIME to component props

  loadMoreProducts = () => {
    const { getNextPage } = this.props;
    getNextPage();
  };

  componentDidMount() {
    const { paginationType } = this.props;
    if (paginationType === paginationTypes.INFINITE_SCROLL) {
      window.addEventListener('scroll', this.nextPageCallback);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const {
      paginationType,
      products = [],
      start,
      query,
      productIdAttribute,
      viewType,
      unbxdCoreStatus
    } = this.props;

    if (
      prevProps.unbxdCoreStatus === 'LOADING' &&
      unbxdCoreStatus === 'READY'
    ) {
      if (this.state.products.length === 0 && products.length) {
        this.setState({ products });
        trackProductImpressions(
          query,
          getProductPids(products, productIdAttribute)
        );
        return;
      }

      if (
        products.length === 0 &&
        start !== 0 &&
        paginationType === paginationTypes.INFINITE_SCROLL
      ) {
        window.removeEventListener('scroll', this.nextPageCallback);
      }

      if (this.state.products.length > 0 && products.length === 0) {
        if (paginationType === paginationTypes.INFINITE_SCROLL) {
          return;
        }

        if (paginationType === paginationTypes.CLICK_N_SCROLL) {
          this.setState({ hasMoreResults: false });

          return;
        }
      }

      if (viewType !== prevProps.viewType) {
        return;
      }

      if (
        prevProps.start !== start &&
        (paginationType === paginationTypes.INFINITE_SCROLL ||
          paginationType === paginationTypes.CLICK_N_SCROLL)
      ) {
        trackProductImpressions(
          query,
          getProductPids(products, productIdAttribute)
        );
        start === 0
          ? this.setState({ products: products })
          : this.setState({
              products: [...prevState.products, ...products],
              start
            });

        return;
      }

      if (prevProps.products !== products && products.length > 0) {
        trackProductImpressions(
          query,
          getProductPids(products, productIdAttribute)
        );
        this.setState({ products: products, start });
        return;
      }
    }
  }

  componentWillUnmount() {
    const { paginationType } = this.props;
    if (paginationType === paginationTypes.INFINITE_SCROLL) {
      window.removeEventListener('scroll', this.nextPageCallback);
    }
  }

  render() {
    const {
      viewType,
      onProductClick,
      perRow,
      attributesMap,
      variantAttributesMap,
      paginationType,
      showVariants,
      ProductItemComponent,
      showSwatches,
      swatchAttributesMap,
      groupBy,
      SwatchItemComponent,
      LoadMoreComponent,
      unbxdCoreStatus,
      LoaderComponent,
      showLoader,
      numberOfProducts,
      ZeroResultsComponent,
      priceUnit
    } = this.props;
    const { products, hasMoreResults } = this.state;

    //return the prop based Zero results template
    if (
      numberOfProducts === 0 &&
      ZeroResultsComponent &&
      unbxdCoreStatus === searchStatus.READY
    ) {
      return !ZeroResultsComponent.prototype.render ? (
        ZeroResultsComponent()
      ) : (
        <ZeroResultsComponent />
      );
    }

    //return the default Zero results template
    if (numberOfProducts === 0 && unbxdCoreStatus === searchStatus.READY) {
      return <NoProducts />;
    }

    const displayClickNScrollTrigger =
      paginationType === paginationTypes.CLICK_N_SCROLL &&
      hasMoreResults &&
      unbxdCoreStatus === searchStatus.READY;
    const displayLoader =
      unbxdCoreStatus === searchStatus.LOADING && showLoader;

    const viewProps = {
      perRow,
      attributesMap,
      products,
      onProductClick,
      showVariants,
      variantAttributesMap,
      ProductItemComponent,
      showSwatches,
      swatchAttributesMap,
      groupBy,
      SwatchItemComponent,
      viewType,
      priceUnit
    };

    const productViewsRender = (
      <React.Fragment>
        {viewType === viewTypes.GRID && <GridView {...viewProps} />}

        {viewType === viewTypes.LIST && <ListView {...viewProps} />}
      </React.Fragment>
    );

    return (
      <div ref={this.productsContainerRef}>
        {productViewsRender}

        {displayClickNScrollTrigger &&
          (LoadMoreComponent ? (
            <LoadMoreComponent loadMoreProducts={this.loadMoreProducts} />
          ) : (
            <div
              className="UNX-productLoadMore"
              onClick={this.loadMoreProducts}
              data-testid={'UNX_loadMore'}
            >
              Load more
            </div>
          ))}

        {displayLoader && <LoaderComponent />}
      </div>
    );
  }
}

ProductsWrapper.propTypes = {
  perRow: PropTypes.number,
  viewType: PropTypes.string.isRequired,
  products: PropTypes.arrayOf(PropTypes.object).isRequired,
  onProductClick: PropTypes.func.isRequired,
  getNextPage: PropTypes.func.isRequired,
  attributesMap: PropTypes.object.isRequired,
  variantAttributesMap: PropTypes.object.isRequired,
  paginationType: PropTypes.string,
  heightDiffToTriggerNextPage: PropTypes.number,
  showVariants: PropTypes.bool.isRequired,
  ProductItemComponent: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.func
  ]),
  showSwatches: PropTypes.bool,
  swatchAttributesMap: PropTypes.object,
  groupBy: PropTypes.string,
  SwatchItemComponent: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
  numberOfProducts: PropTypes.number.isRequired,
  start: PropTypes.number.isRequired,
  ZeroResultsComponent: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.func
  ]),
  priceUnit: PropTypes.string.isRequired
};

export default ProductsWrapper;
