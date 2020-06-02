import React from 'react';

import { ProductContextConsumer } from './context'

import NoProducts from './NoProducts';
import ProductsWrapper from './ProductsWrapper';



const ProductsView = () => {
    return (<ProductContextConsumer>{({ data, helpers }) => {

        const { productViewType, productMap, perRow, productVariantMap, paginationType, heightDiffToTriggerNextPage } = data;
        const { getSearchResults, ZeroResultsComponent, onProductClick, getNextPage } = helpers;

        const { numberOfProducts = 0, products = [] } = getSearchResults() || {};

        //return the prop based Zero results template
        if (numberOfProducts === 0 && ZeroResultsComponent) {
            return !ZeroResultsComponent.prototype.render
                ? ZeroResultsComponent() : <ZeroResultsComponent />;
        }

        //return the default Zero results template
        if (numberOfProducts === 0) {
            return <NoProducts />;
        }

        return (<ProductsWrapper
            productViewType={productViewType}
            perRow={perRow}
            products={products}
            productMap={productMap}
            productVariantMap={productVariantMap}
            paginationType={paginationType}
            getNextPage={getNextPage}
            heightDiffToTriggerNextPage={heightDiffToTriggerNextPage}
            onProductClick={onProductClick}
        />)

    }}
    </ProductContextConsumer>);
}

export default ProductsView;