import React from 'react';

import UnbxdSearchWrapper from '../src/UnbxdSearchWrapper';
import { Products } from '../src/modules/products/Products';

export default {
    title: 'Products',
    component: Products
}

class NoProductsComponent extends React.Component {
    render() {
        return (<p>No products found!!!</p>);
    }
}

const CustomProductCardComponent = (props) => {
    console.log("Props ", props);
    return (<p>Hello product card</p>)
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

export const Product = () => (<UnbxdSearchWrapper
    siteKey='wildearthclone-neto-com-au808941566310465'
    apiKey='e6959ae0b643d51b565dc3e01bf41ec1'>

    <Products
        paginationType={'INFINITE_SCROLL'}
        heightDiffToTriggerNextPage={50}
        perRow={3}
        pageSize={20}
        productViewTypes={["LIST", "GRID"]}
        ZeroResultsComponent={NoProductsComponent}
        productMap={productMap}
        showVariants={true}
        variantsCount={2}
        productVariantMap={productVariantMap} />

</UnbxdSearchWrapper >);

export const ViewtypesAndProductsview = () => (<UnbxdSearchWrapper
    siteKey='wildearthclone-neto-com-au808941566310465'
    apiKey='e6959ae0b643d51b565dc3e01bf41ec1'>

    <Products
        paginationType={'INFINITE_SCROLL'}
        heightDiffToTriggerNextPage={50}
        perRow={5}
        pageSize={20}
        productViewTypes={["LIST", "GRID"]}
        ZeroResultsComponent={NoProductsComponent}
        productMap={productMap}
        showVariants={true}
        variantsCount={2}
        productVariantMap={productVariantMap}>

        <Products.ViewTypes />
        <Products.ProductsView />

    </Products>

</UnbxdSearchWrapper >)


export const StylingViewtypesAndProductview = () => (<UnbxdSearchWrapper
    siteKey='wildearthclone-neto-com-au808941566310465'
    apiKey='e6959ae0b643d51b565dc3e01bf41ec1'>

    <Products
        paginationType={'INFINITE_SCROLL'}
        heightDiffToTriggerNextPage={50}
        perRow={5}
        pageSize={20}
        productViewTypes={["LIST", "GRID"]}
        ZeroResultsComponent={NoProductsComponent}
        productMap={productMap}
        showVariants={true}
        variantsCount={2}
        productVariantMap={productVariantMap}>

        <div className='viewtypes-class'>
            <Products.ViewTypes />
        </div>
        <div className='productsview-class'>
            <Products.ProductsView />
        </div>

    </Products>

</UnbxdSearchWrapper >)

export const InfiniteScrollPagination = () => (<UnbxdSearchWrapper
    siteKey='wildearthclone-neto-com-au808941566310465'
    apiKey='e6959ae0b643d51b565dc3e01bf41ec1'>

    <Products
        paginationType={'INFINITE_SCROLL'}
        heightDiffToTriggerNextPage={50}
        productMap={productMap} />

</UnbxdSearchWrapper >)

export const ClickNScrollPagination = () => (<UnbxdSearchWrapper
    siteKey='wildearthclone-neto-com-au808941566310465'
    apiKey='e6959ae0b643d51b565dc3e01bf41ec1'>

    <Products
        paginationType={'CLICK_N_SCROLL'}
        productMap={productMap} />

</UnbxdSearchWrapper >)

export const FixedPagination = () => (<UnbxdSearchWrapper
    siteKey='wildearthclone-neto-com-au808941566310465'
    apiKey='e6959ae0b643d51b565dc3e01bf41ec1'>

    <Products
        paginationType={'FIXED_PAGINATION'}
        productMap={productMap} />

</UnbxdSearchWrapper >)

export const PageSizeAndPerRow = () => (<UnbxdSearchWrapper
    siteKey='wildearthclone-neto-com-au808941566310465'
    apiKey='e6959ae0b643d51b565dc3e01bf41ec1'>

    <Products
        paginationType={'FIXED_PAGINATION'}
        perRow={3}
        pageSize={12}
        productMap={productMap} />

</UnbxdSearchWrapper >)

export const ProductViewTypeList = () => (<UnbxdSearchWrapper
    siteKey='wildearthclone-neto-com-au808941566310465'
    apiKey='e6959ae0b643d51b565dc3e01bf41ec1'>

    <Products
        paginationType={'FIXED_PAGINATION'}
        productViewTypes={["LIST"]}
        productMap={productMap} />

</UnbxdSearchWrapper >)

export const ProductViewTypeGrid = () => (<UnbxdSearchWrapper
    siteKey='wildearthclone-neto-com-au808941566310465'
    apiKey='e6959ae0b643d51b565dc3e01bf41ec1'>

    <Products
        paginationType={'FIXED_PAGINATION'}
        productViewTypes={["GRID"]}
        productMap={productMap} />

</UnbxdSearchWrapper >)

export const ZeroResultsComponent = () => (<UnbxdSearchWrapper
    siteKey='wildearthclone-neto-com-au808941566310465'
    apiKey='e6959ae0b643d51b565dc3e01bf41ec1'>

    <Products
        paginationType={'FIXED_PAGINATION'}
        ZeroResultsComponent={NoProductsComponent}
        productMap={productMap} />

</UnbxdSearchWrapper >)

export const ConfigureVariants = () => (<UnbxdSearchWrapper
    siteKey='wildearthclone-neto-com-au808941566310465'
    apiKey='e6959ae0b643d51b565dc3e01bf41ec1'>

    <Products
        paginationType={'FIXED_PAGINATION'}
        productMap={productMap}
        showVariants={true}
        variantsCount={2}
        productVariantMap={productVariantMap} />

</UnbxdSearchWrapper >)

export const CustomProductCard = () => (<UnbxdSearchWrapper
    siteKey='wildearthclone-neto-com-au808941566310465'
    apiKey='e6959ae0b643d51b565dc3e01bf41ec1'>

    <Products
        paginationType={'FIXED_PAGINATION'}
        productMap={productMap}
        showVariants={true}
        variantsCount={2}
        productVariantMap={productVariantMap}
        ProductCardComponent={CustomProductCardComponent} />

</UnbxdSearchWrapper >)
