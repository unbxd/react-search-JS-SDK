import React from 'react';

import { ProductContextConsumer } from '../context'

import NoProducts from './NoProducts';
import ProductsWrapper from './ProductsWrapper';



const ProductsView = () => {
    return (<ProductContextConsumer>{({ data, helpers }) => {

        const { productViewType,
            productMap,
            perRow,
            productVariantMap,
            paginationType,
            heightDiffToTriggerNextPage,
            showVariants,
            showSwatches,
            swatchAttributes,
            groupBy,
            unbxdCoreStatus,
            query,
            productIdAttribute } = data;

        const { getSearchResults,
            ZeroResultsComponent,
            onProductClick,
            getNextPage,
            ProductItemComponent,
            swatchItemComponent, } = helpers;

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
            showVariants={showVariants}
            onProductClick={onProductClick}
            ProductItemComponent={ProductItemComponent}
            showSwatches={showSwatches}
            swatchAttributes={swatchAttributes}
            groupBy={groupBy}
            swatchItemComponent={swatchItemComponent}
            unbxdCoreStatus={unbxdCoreStatus}
            query={query}
            productIdAttribute={productIdAttribute}
        />)

    }}
    </ProductContextConsumer>);
}

export default ProductsView;
