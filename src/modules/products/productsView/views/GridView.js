import React from 'react';
import PropTypes from 'prop-types';

import { GridProductCard } from '../productCards';
import { List } from '../../../../components/index';
//We need the productAttributes object to map to values

const GridView = (props) => {

    const { products = [],
        perRow,
        productAttributes,
        showVariants,
        variantAttributes,
        onProductClick,
        ProductItemComponent,
        showSwatches,
        swatchAttributes,
        groupBy,
        SwatchItemComponent } = props;

    return (<div className='UNX-product-container'>
        <List
            idAttribute={'uniqueId'}
            items={products}
            ListItem={ProductItemComponent || GridProductCard}
            onClick={onProductClick}
            productAttributes={productAttributes}
            showVariants={showVariants}
            variantAttributes={variantAttributes}
            showSwatches={showSwatches}
            swatchAttributes={swatchAttributes}
            groupBy={groupBy}
            SwatchItemComponent={SwatchItemComponent}
            className={`UNX-grid-view grid-cols-${perRow}`} />
    </div>)
}

GridView.propTypes = {
    products: PropTypes.arrayOf(PropTypes.object).isRequired,
    perRow: PropTypes.number.isRequired,
    productAttributes: PropTypes.object.isRequired,
    showVariants: PropTypes.bool.isRequired,
    variantAttributes: PropTypes.object.isRequired,
    onProductClick: PropTypes.func.isRequired
}

export default GridView;
