import React from 'react';

import UnbxdSearchWrapper from '../src/App';
import Products from '../src/modules/products';

export default {
    title: 'UnbxdSearchWrapper'
}

class NoProductsComponent extends React.Component {
    render() {
        return (<p>No products found!!!</p>);
    }
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

export const UnbxdSearchWrapperProductComponent = () => (<UnbxdSearchWrapper
    siteKey='wildearthclone-neto-com-au808941566310465'
    apiKey='e6959ae0b643d51b565dc3e01bf41ec1'>

    <Products
        paginationType={'FIXED_PAGINATION'}
        heightDiffToTriggerNextPage={50}
        perRow={5}
        pageSize={20}
        productViewTypes={["LIST", "GRID"]}
        ZeroResultsComponent={NoProductsComponent}
        productMap={productMap}
        showVariants={true}
        variantsCount={2}
        productVariantMap={productVariantMap} />

</UnbxdSearchWrapper >)  
