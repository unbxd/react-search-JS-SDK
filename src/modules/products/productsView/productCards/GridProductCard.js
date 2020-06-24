import React from 'react';
import PropTypes from 'prop-types';

import { getProductFields } from '../../utils';

const GridProductCard = ({ itemData, productMap, showVariants, productVariantMap }) => {

    //Get the datas from the product bases on productMap and create the card
    const productValues = getProductFields(itemData, productMap, showVariants, productVariantMap);

    const {
        productName,
        imageUrl,
        price,
        sellingPrice } = productValues;
    const uniqueId = itemData.uniqueId;

    //Add support for router as a config
    return (<div className='UNX-product-card-container' data-uniqueid={uniqueId}>
        <a href={itemData.productUrl} className={`UNX-product-card UNX-grid-card`} data-uniqueid={uniqueId}>
            <img className='UNX-image' src={imageUrl} data-uniqueid={uniqueId} />
            <p className='UNX-product-name' data-uniqueid={uniqueId}>{productName}</p>
            <p className='UNX-price' data-uniqueid={uniqueId}>{price}</p>
            <p className='UNX-selling-price' data-uniqueid={uniqueId}>{sellingPrice}</p>
        </a>
        {/* swatch content */}
    </div>)
}

GridProductCard.propTypes = {
    itemData: PropTypes.object.isRequired,
    productMap: PropTypes.object.isRequired,
    showVariants: PropTypes.bool.isRequired,
    productVariantMap: PropTypes.object.isRequired
}

export default GridProductCard;
