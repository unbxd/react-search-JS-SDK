import React from 'react';
import PropTypes from 'prop-types';

import { GridProductCard } from '../productCards';
import { List } from '../../../../components/index';
//We need the productMap object to map to values

const GridView = (props) => {

    const { products = [],
        perRow,
        productMap,
        showVariants,
        productVariantMap,
        onProductClick,
        ProductItemComponent,
        showSwatches,
        swatchAttributes,
        groupBy,
        swatchItemComponent } = props;

    return (<div className='UNX-product-container'>
        <List
            idAttribute={'uniqueId'}
            items={products}
            ListItem={ProductItemComponent || GridProductCard}
            onClick={onProductClick}
            productMap={productMap}
            showVariants={showVariants}
            productVariantMap={productVariantMap}
            showSwatches={showSwatches}
            swatchAttributes={swatchAttributes}
            groupBy={groupBy}
            swatchItemComponent={swatchItemComponent}
            className={`UNX-grid-view grid-cols-${perRow}`} />
    </div>)
}

GridView.propTypes = {
    products: PropTypes.arrayOf(PropTypes.object).isRequired,
    perRow: PropTypes.number.isRequired,
    productMap: PropTypes.object.isRequired,
    showVariants: PropTypes.bool.isRequired,
    productVariantMap: PropTypes.object.isRequired,
    onProductClick: PropTypes.func.isRequired
}

export default GridView;
