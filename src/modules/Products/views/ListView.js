import React from 'react';
import PropTypes from 'prop-types';

import { ListProductCard } from '../productCards';

const ListView = (props) => {

    const { products = [],
        productMap,
        productVariantMap,
        onProductClick } = props;

    return (<div className={`UNX-product-container UNX-list-view grid-cols-1`} onClick={onProductClick}>{
        products.map((product) => {
            return (<ListProductCard product={product}
                productMap={productMap}
                productVariantMap={productVariantMap}
                key={product.uniqueId} />)
        })

    }
    </div>)
}
ListView.propTypes = {
    products: PropTypes.arrayOf(PropTypes.object).isRequired,
    productMap: PropTypes.object.isRequired,
    productVariantMap: PropTypes.object.isRequired,
    onProductClick: PropTypes.func.isRequired
}

export default ListView;