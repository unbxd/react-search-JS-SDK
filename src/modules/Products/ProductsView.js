import React from 'react';

import { ProductContextConsumer } from './Context'

import NoProducts from './NoProducts';
import ProductsWrapper from './ProductsWrapper';



const ProductsView = () => {
    return (<ProductContextConsumer>{({ isGrid, getSearchResults, ZeroResultsTemplate, ...props }) => {

        const { numberOfProducts = 0, products = [] } = getSearchResults() || {};

        //return the prop based Zero results template
        if (numberOfProducts === 0 && ZeroResultsTemplate) {
            return !ZeroResultsTemplate.prototype.render
                ? ZeroResultsTemplate() : <ZeroResultsTemplate />;
        }

        //return the default Zero results template
        if (numberOfProducts === 0) {
            return <NoProducts />;
        }

        //return the default product results template
        //we can make an object of props and destructure it.
        return (<ProductsWrapper isGrid={isGrid} products={products} {...props} />)

    }}
    </ProductContextConsumer>);
}

export default ProductsView;
