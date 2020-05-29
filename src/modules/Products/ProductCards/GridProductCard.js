import React from 'react';
import PropTypes from 'prop-types';

import { productFieldsMapper } from '../utils';

const GridProductCard = ({ product, fieldMap, variantMap, unbxdProductCardClickHandler }) => {

    //Get the datas from the product bases on fieldMap and create the card
    const productValues = productFieldsMapper(product, fieldMap, variantMap);

    const {
        productName,
        imageUrl,
        price,
        sellingPrice } = productValues;

    //Add support for router as a config
    return (<div className='Unbx-product-card-container'>
        <a href={product.productUrl} className={`Unbx-product-card Unbx-grid-card`} onClick={unbxdProductCardClickHandler}>
            <img className='Unbx-product-card Unbx-image' src={imageUrl[0]} />
            <p className='Unbx-product-card Unbx-product-name'>{productName}</p>
            <p className='Unbx-product-card Unbx-price'>{price}</p>
            <p className='Unbx-product-card Unbx-selling-price'>{sellingPrice}</p>
        </a>
        {/* swatch content */}
    </div>)
}

GridProductCard.propTypes = {
    product: PropTypes.object.isRequired,
    fieldMap: PropTypes.object.isRequired,
    isVariant: PropTypes.bool.isRequired,
    variantMap: PropTypes.object.isRequired,
    unbxdProductCardClickHandler: PropTypes.func.isRequired
}

export default GridProductCard;
