import React from 'react';
import PropTypes from 'prop-types';

import { GridProductCard } from '../productCards';
//We need the productMap object to map to values

const GridView = (props) => {

    const { products = [],
        perRow,
        productMap,
        showVariants,
        productVariantMap,
        onProductClick } = props;

    return (<div className={`UNX-product-container UNX-grid-view grid-cols-${perRow}`} onClick={onProductClick}>{
        products.map((product) => {
            return (<GridProductCard product={product}
                productMap={productMap}
                showVariants={showVariants}
                productVariantMap={productVariantMap}
                key={product.uniqueId} />)
        })

    }
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
