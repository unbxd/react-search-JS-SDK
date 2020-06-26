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

const ProductItemComponent = ({ itemData }) => {
    const { imageUrl, title } = itemData;
    return (<div className='myproduct'>
        <img src={imageUrl[0]} />
        <p>{title}</p>
    </div>)
}

const ProductsViewListItemComponent = ({ itemData, isActive }) => {
    return (<p data-viewtype={itemData} className={`${isActive ? 'active' : ''}`}>
        {itemData}
    </p>)
}

const LoaderComponent = () => {
    return (<p>loading...</p>)
}

const onProductClick = (product) => {
    console.log('product is clicked', product);
    return true;
}

const onZeroResults = (query) => {
    console.log('Zero results', query);
    return true;
}

const productMap = {
    productName: "title",
    uniqueId: "uniqueId",
    imageUrl: "imageUrl",
    price: "min_cheapest_default_price",
    productUrl: "productUrl"
}

const productVariantMap = {
    productName: "title",
    uniqueId: "variantId",
    imageUrl: "variant_image_array",
    price: "v_default_price",
    productUrl: "variant_productUrl",
    swatchImage: "variant_overhead_swatch",
    variant_color: "variant_color"
}

const swatchAttributes = {
    uniqueId: "variantId",
    swatchImageUrl: 'variant_overhead_swatch',
    imageUrl: 'variant_image_array',
    price: "v_default_price",
};

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

export const ViewtypesDisplayTypes = () => (<UnbxdSearchWrapper
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
        productVariantMap={productVariantMap}
        productViewDisplayType={'LIST'}
        ProductsViewListItemComponent={ProductsViewListItemComponent} />

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
        ProductItemComponent={ProductItemComponent} />

</UnbxdSearchWrapper >)

export const ProductsWithALoader = () => (<UnbxdSearchWrapper
    siteKey='wildearthclone-neto-com-au808941566310465'
    apiKey='e6959ae0b643d51b565dc3e01bf41ec1'>

    <Products
        paginationType={'FIXED_PAGINATION'}
        productMap={productMap}
        showVariants={true}
        variantsCount={2}
        productVariantMap={productVariantMap}
        ProductItemComponent={ProductItemComponent}
        LoaderComponent={LoaderComponent}
        showLoader={true}
        onProductClick={onProductClick} />
        onZeroResults={onZeroResults} />

</UnbxdSearchWrapper >)

export const ProductsCallbacks = () => (<UnbxdSearchWrapper
    siteKey='wildearthclone-neto-com-au808941566310465'
    apiKey='e6959ae0b643d51b565dc3e01bf41ec1'>

    <Products
        paginationType={'FIXED_PAGINATION'}
        productMap={productMap}
        showVariants={true}
        variantsCount={2}
        productVariantMap={productVariantMap}
        ProductItemComponent={ProductItemComponent}
        LoaderComponent={LoaderComponent}
        showLoader={true}
        onProductClick={onProductClick}
        onZeroResults={onZeroResults} />

</UnbxdSearchWrapper >)
