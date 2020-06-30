import React from 'react';
import PropTypes from 'prop-types';

import { ListProductCard } from '../productCards';
import { List } from '../../../../components/index';

const ListView = (props) => {

    const { products = [],
        productAttributes,
        showVariants,
        variantAttributes,
        onProductClick,
        ProductItemComponent,
        showSwatches,
        swatchAttributes,
        groupBy,
        SwatchItemComponent, } = props;

    return (<div className='UNX-product-container'>{
        <List
            idAttribute={'uniqueId'}
            items={products}
            ListItem={ProductItemComponent || ListProductCard}
            onClick={onProductClick}
            productAttributes={productAttributes}
            showVariants={showVariants}
            variantAttributes={variantAttributes}
            showSwatches={showSwatches}
            swatchAttributes={swatchAttributes}
            groupBy={groupBy}
            SwatchItemComponent={SwatchItemComponent}
            className='UNX-list-view grid-cols-1' />
    }
    </div>)
}
ListView.propTypes = {
    products: PropTypes.arrayOf(PropTypes.object).isRequired,
    productAttributes: PropTypes.object.isRequired,
    showVariants: PropTypes.bool.isRequired,
    variantAttributes: PropTypes.object.isRequired,
    onProductClick: PropTypes.func.isRequired
}

export default ListView;
