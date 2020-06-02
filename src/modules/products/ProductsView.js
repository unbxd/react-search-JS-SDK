import React from 'react';

import { ProductContextConsumer } from './context'

import NoProducts from './NoProducts';
import ProductsWrapper from './ProductsWrapper';



const ProductsView = () => {
    return (<ProductContextConsumer>{({ productViewType, getSearchResults, ZeroResultsComponent, ...props }) => {

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

        return (<ProductsWrapper productViewType={productViewType} products={products} {...props} />)

    }}
    </ProductContextConsumer>);
}

export default ProductsView;
