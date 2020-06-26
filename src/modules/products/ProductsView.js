import React from 'react';

import { ProductContextConsumer } from './context'

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
            showVariants } = data;

        const { getSearchResults,
            ZeroResultsComponent,
            onProductClick,
            getNextPage,
            ProductCardComponent,
            onZeroResults } = helpers;

        const { numberOfProducts = 0, products = [], start } = getSearchResults() || {};

        if (numberOfProducts === 0) {

            onZeroResults && onZeroResults();

            //return the prop based Zero results template
            if (ZeroResultsComponent) {
                return !ZeroResultsComponent.prototype.render
                    ? ZeroResultsComponent() : <ZeroResultsComponent />;
            } else {

                //return the default Zero results template
                return <NoProducts />;
            }


        }

        return (<ProductsWrapper
            productViewType={productViewType}
            perRow={perRow}
            start={start}
            products={products}
            productMap={productMap}
            productVariantMap={productVariantMap}
            paginationType={paginationType}
            getNextPage={getNextPage}
            heightDiffToTriggerNextPage={heightDiffToTriggerNextPage}
            showVariants={showVariants}
            onProductClick={onProductClick}
            ProductCardComponent={ProductCardComponent}
        />)

    }}
    </ProductContextConsumer>);
}

export default ProductsView;
