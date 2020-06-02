import React from 'react';
import PropTypes from 'prop-types';

import { getProductFields } from '../utils';

const ListProductCard = ({ product, productMap, productVariantMap }) => {

    //Get the datas from the product bases on productMap and create the card
    const productValues = getProductFields(product, productMap, productVariantMap);

    const {
        productName,
        imageUrl,
        price,
        sellingPrice } = productValues;

    //Add support for router as a config
    return (<div className='UNX-product-card-container' data-uniqueid={product.uniqueId}>
        <a href={product.productUrl} className={`UNX-product-card UNX-list-card`} data-uniqueid={product.uniqueId}>
            <img className='UNX-image' src={imageUrl} data-uniqueid={product.uniqueId} />
            <p className='UNX-product-name data-uniqueid={product.uniqueId}'>{productName}</p>
            <p className='UNX-price' data-uniqueid={product.uniqueId}>{price}</p>
            <p className='UNX-selling-price' data-uniqueid={product.uniqueId}>{sellingPrice}</p>
        </a>
        {/* swatch content */}
    </div>)
}

ListProductCard.propTypes = {
    product: PropTypes.object.isRequired,
    productMap: PropTypes.object.isRequired,
    productVariantMap: PropTypes.object.isRequired
}

export default ListProductCard;