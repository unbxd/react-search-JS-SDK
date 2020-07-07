import React from 'react';

import { ProductContextConsumer } from '../context'

import NoProducts from './NoProducts';
import ProductsWrapper from './ProductsWrapper';


const ProductsView = () => {
    return (<ProductContextConsumer>{({ data, helpers }) => {

        const { perRow,
            productViewType,
            attributesMap,
            variantAttributesMap,
            paginationType,
            heightDiffToTriggerNextPage,
            showVariants,
            showSwatches,
            swatchAttributes,
            groupBy,
            unbxdCoreStatus,
            query,
            productIdAttribute,
            showLoader } = data;

        const { getSearchResults,
            ZeroResultsComponent,
            onProductClick,
            getNextPage,
            ProductItemComponent,
            SwatchItemComponent,
            LoadMoreComponent,
            LoaderComponent } = helpers;

        const { numberOfProducts = 0, products = [], start = 0 } = getSearchResults() || {};

        //return the prop based Zero results template
        if (numberOfProducts === 0 && ZeroResultsComponent) {
            return !ZeroResultsComponent.prototype.render
                ? ZeroResultsComponent() : <ZeroResultsComponent />;
        }

        //return the default Zero results template
        if (numberOfProducts === 0) {
            return <NoProducts />;
        }

        const productsWrapperProps = {
            perRow,
            productViewType,
            products,
            attributesMap,
            variantAttributesMap,
            paginationType,
            getNextPage,
            heightDiffToTriggerNextPage,
            showVariants,
            onProductClick,
            ProductItemComponent,
            showSwatches,
            swatchAttributes,
            groupBy,
            SwatchItemComponent,
            unbxdCoreStatus,
            query,
            productIdAttribute,
            LoadMoreComponent,
            LoaderComponent,
            showLoader,
            start,
        }

        return (<ProductsWrapper {...productsWrapperProps} />)

    }}
    </ProductContextConsumer>);
}

export default ProductsView;
