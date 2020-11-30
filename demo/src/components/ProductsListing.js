import React from 'react';

import { Products } from '@unbxd-ui/react-search-sdk';

// const attributesMap = {
//   productName: 'title',
//   uniqueId: 'uniqueId',
//   imageUrl: 'imageUrl',
//   price: 'min_cheapest_default_price',
//   sellingPrice: 'cheapest_msrp',
//   productUrl: 'productUrl'
// };

// const variantAttributesMap = {
//   productName: 'title',
//   uniqueId: 'variantId',
//   imageUrl: 'variant_image_array',
//   price: 'variant_cheapest_default_price',
//   sellingPrice: 'variant_min_cheapest_msrp',
//   productUrl: 'variant_productUrl',
//   swatchImage: 'variant_overhead_swatch',
//   variant_color: 'variant_color'
// };

const attributesMap = {
    productName: 'PRODUCT_NAME',
    uniqueId: 'uniqueId',
    imageUrl: 'IMAGE_URL',
    sellingPrice: 'PRODUCT_PRICE',
    productUrl: 'PRODUCT_URL'
};

const variantAttributesMap = {
    productName: 'v_title',
    uniqueId: 'vId',
    imageUrl: 'imageUrl',
    price: 'v_RRP_Price',
    sellingPrice: 'v_unbxd_price',
    productUrl: 'productUrl'
};

const swatchAttributesMap = {
    swatchId: 'variantId',
    swatchImageUrl: 'variant_overhead_swatch',
    imageUrl: 'variant_image_array',
    price: 'variant_cheapest_default_price',
    sellingPrice: 'variant_min_cheapest_msrp',
    productUrl: 'variant_productUrl'
};

const ProductsListing = () => {
    return (
        <Products
            attributesMap={attributesMap}
            pageSize={10}
            showVariants={true}
            variantsCount={4}
            variantAttributesMap={variantAttributesMap}
            showSwatches={false}
            groupBy={'variant_color'}
            swatchAttributesMap={swatchAttributesMap}
            paginationType={'FIXED_PAGINATION'}
        />
    );
};

export default ProductsListing;
