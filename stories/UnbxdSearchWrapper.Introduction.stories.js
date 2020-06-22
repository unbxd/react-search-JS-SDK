import React from 'react';

import UnbxdSearchWrapper from '../src/UnbxdSearchWrapper';
import Products from '../src/modules/products';
import SearchBox from '../src/modules/searchBox';

export default {
    title: 'Introduction',
    //component: Products
}

const productMap = {
    productName: "title",
    uniqueId: "uniqueId",
    imageUrl: "imageUrl",
    price: "RRP_Price",
    sellingPrice: "unbxd_price",
    productUrl: "productUrl"
}

const productVariantMap = {
    productName: "v_title",
    uniqueId: "vId",
    imageUrl: "v_imageUrl",
    price: "v_RRP_Price",
    sellingPrice: "v_unbxd_price"
}

const LoaderComponent = () => {
    return (<p>loading...</p>)
}

export const Introduction = () => (<UnbxdSearchWrapper
    siteKey='wildearthclone-neto-com-au808941566310465'
    apiKey='e6959ae0b643d51b565dc3e01bf41ec1'>

    <SearchBox />

    <Products
        paginationType={'FIXED_PAGINATION'}
        perRow={3}
        pageSize={20}
        productViewTypes={["GRID", "LIST"]}
        productMap={productMap}
        showVariants={true}
        variantsCount={2}
        productVariantMap={productVariantMap}
    />

</UnbxdSearchWrapper >);
