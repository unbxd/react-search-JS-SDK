import React from 'react';


import { Products } from '@unbxd-ui/react-search-sdk';

const attributesMap = {
    productName: "title",
    uniqueId: "uniqueId",
    imageUrl: "imageUrl",
    price: "unbxd_price",
    sellingPrice: "RRP_Price",
    productUrl: "productUrl"
}

const variantAttributesMap = {
    productName: "title",
    uniqueId: "vId",
    imageUrl: "imageUrl",
    price: "unbxd_price",
    sellingPrice: "RRP_Price",
    productUrl: "productUrl"
}

const ProductsViewItemComponent = ({ itemData, isActive, onClick }) => {
    const iconClassName = itemData === "GRID" ? `glyphicon glyphicon-th` : `glyphicon glyphicon-th-list`
    return (<div className='UNX-viewType__wrapper'>
        <a
            className={`${isActive ? '-active' : ''}`}
            data-viewtype={itemData}
            onClick={onClick}
            href="#">
            <i className={iconClassName} data-viewtype={itemData}></i>
        </a>
    </div>)
}

const ProductsListing = () => {
    return (
        <Products
            perRow={4}
            attributesMap={attributesMap}
            showVariants={true}
            variantsCount={2}
            variantAttributesMap={variantAttributesMap}
            productViewTypes={['GRID', 'LIST']}
            productViewDisplayType={'LIST'}
            ProductsViewItemComponent={ProductsViewItemComponent}
        />

    )
}

export default ProductsListing;
