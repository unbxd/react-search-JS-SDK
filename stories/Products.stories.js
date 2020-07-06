import React from 'react';
import { storiesOf } from '@storybook/react';

import UnbxdSearchWrapper from '../src/UnbxdSearchWrapper';
import Products from '../src/modules/products';
import SearchBox from '../src/modules/searchBox';

const stories = storiesOf('Products', module).addParameters({
    props: {
        propTablesExclude: [UnbxdSearchWrapper,
            'ProductViews',
            'ViewTypes',
            'SearchBox']
    }
});

const defaultSearch = 'Boots';
const swatchesDefaultSearch = 'rugs';

class ZeroResultsComponent extends React.Component {
    render() {
        return (<p>No products found!!!</p>);
    }
}

class ProductItemComponent extends React.Component {

    constructor(props) {
        super(props);

        const {
            itemData,
            idAttribute,
            showVariants,
            showSwatches,
            swatchAttributes
        } = this.props;

        this.state = {
            productValues: this.getParsedProduct({
                itemData,
                showVariants,
                showSwatches,
                swatchAttributes,
                idAttribute
            })
        };
    }

    getParsedProduct = ({
        itemData,
        idAttribute
    }) => {

        const { imageUrl, title, productUrl, variants } = itemData;
        const swatchValues = variants.map((variant, index) => {

            return {
                swatchId: variant.variantId,
                imageUrl: variant.variant_image_array[0],
                swatchImageUrl: variant.variant_overhead_swatch,
                active: index === 0 ? true : false
            }
        });

        const productValues = { idAttribute, imageUrl, title, productUrl, swatchValues };
        return productValues;
    }

    handleSwatchClick = (event) => {

        const currentSwatchId = event.target.dataset['swatchid'];
        this.setState(({ productValues }) => {
            return {
                productValues: {
                    ...productValues,
                    swatchValues: productValues.swatchValues.map(swatch => {
                        if (swatch.swatchId === currentSwatchId) {
                            return { ...swatch, active: true }
                        } else {
                            return { ...swatch, active: false }
                        };
                    })
                }
            }
        })
    }

    render() {

        const { productValues } = this.state;
        const { idAttribute, idx, showSwatches, onClick } = this.props;

        const [activeSwatch] = productValues['swatchValues'].filter((swatch) => {
            return swatch.active
        });

        const product = { ...productValues, ...activeSwatch };
        const { imageUrl, title, productUrl, swatchValues } = product;
        const uniqueId = idAttribute;
        const prank = idx + 1;

        return (<div className='UNX-product-card-container'>
            <div className='details' data-uniqueid={uniqueId} data-prank={prank} onClick={onClick}>
                <a href={productUrl} data-uniqueid={uniqueId} data-prank={prank}>
                    <img className='UNX-image' src={imageUrl} data-uniqueid={uniqueId} data-prank={prank} />
                    <p className='UNX-product-name' data-uniqueid={uniqueId} data-prank={prank}>{title}</p>
                </a>
            </div>
            {showSwatches && <div className='UNX-swatch-item-list-container'>
                {swatchValues.map(swatch => {
                    const { swatchImageUrl, swatchId } = swatch;
                    return (<img className='UNX-swatch-item image' src={swatchImageUrl} data-swatchid={swatchId} onClick={this.handleSwatchClick} />)
                })}
            </div>}
        </div>)
    }
}

const ProductsViewItemComponent = ({ itemData, isActive, onClick }) => {
    return (<p
        data-viewtype={itemData}
        className={`${isActive ? 'active' : ''}`}
        onClick={onClick}>
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

const attributesMap = {
    productName: "title",
    uniqueId: "uniqueId",
    imageUrl: "imageUrl",
    price: "min_cheapest_default_price",
    productUrl: "productUrl"
}

const variantAttributesMap = {
    productName: "title",
    uniqueId: "variantId",
    imageUrl: "variant_image_array",
    price: "v_default_price",
    productUrl: "variant_productUrl",
    swatchImage: "variant_overhead_swatch",
    variant_color: "variant_color"
}

const swatchAttributes = {
    swatchId: "variantId",
    swatchImageUrl: 'variant_overhead_swatch',
    imageUrl: 'variant_image_array',
    price: "v_default_price",
    productUrl: "variant_productUrl",
};

const SwatchItemComponent = ({ itemData, onClick }) => {
    const { swatchImageUrl, swatchId, active } = itemData;
    return (<div
        className={`my-swatch ${active ? 'active' : ''}`}
        data-variant_id={swatchId}
        onClick={onClick}
    >
        <img
            data-variant_id={swatchId}
            src={swatchImageUrl} className='image' />
    </div>)
}

const LoadMoreComponent = ({ loadMoreProducts }) => {

    return (<div onClick={loadMoreProducts}>Load more</div>)
}

stories.add('default', () => (<UnbxdSearchWrapper
    siteKey='wildearthclone-neto-com-au808941566310465'
    apiKey='e6959ae0b643d51b565dc3e01bf41ec1'>

    <Products
        attributesMap={attributesMap} />

    <div className='hidden'>
        <SearchBox defaultSearch={defaultSearch} />
    </div>
</UnbxdSearchWrapper >));

stories.add('with perRow', () => (<UnbxdSearchWrapper
    siteKey='wildearthclone-neto-com-au808941566310465'
    apiKey='e6959ae0b643d51b565dc3e01bf41ec1'>

    <Products
        perRow={3}
        attributesMap={attributesMap} />

    <div className='hidden'>
        <SearchBox defaultSearch={defaultSearch} />
    </div>

</UnbxdSearchWrapper >));

stories.add('with pageSize', () => (<UnbxdSearchWrapper
    siteKey='wildearthclone-neto-com-au808941566310465'
    apiKey='e6959ae0b643d51b565dc3e01bf41ec1'>

    <Products
        pageSize={20}
        paginationType={'INFINITE_SCROLL'}
        attributesMap={attributesMap} />

    <div className='hidden'>
        <SearchBox defaultSearch={defaultSearch} />
    </div>

</UnbxdSearchWrapper >));

stories.add('with showVariants', () => (<UnbxdSearchWrapper
    siteKey='wildearthclone-neto-com-au808941566310465'
    apiKey='e6959ae0b643d51b565dc3e01bf41ec1'>

    <Products
        showVariants={true}
        attributesMap={attributesMap}
        variantAttributesMap={variantAttributesMap} />

    <div className='hidden'>
        <SearchBox defaultSearch={defaultSearch} />
    </div>

</UnbxdSearchWrapper >));

stories.add('with variantsCount', () => (<UnbxdSearchWrapper
    siteKey='wildearthclone-neto-com-au808941566310465'
    apiKey='e6959ae0b643d51b565dc3e01bf41ec1'>

    <Products
        showVariants={true}
        variantsCount={2}
        attributesMap={attributesMap}
        variantAttributesMap={variantAttributesMap} />

    <div className='hidden'>
        <SearchBox defaultSearch={defaultSearch} />
    </div>

</UnbxdSearchWrapper >));

stories.add('with infinite scroll', () => (<UnbxdSearchWrapper
    siteKey='wildearthclone-neto-com-au808941566310465'
    apiKey='e6959ae0b643d51b565dc3e01bf41ec1'>

    <Products
        pageSize={20}
        paginationType={'INFINITE_SCROLL'}
        heightDiffToTriggerNextPage={200}
        attributesMap={attributesMap} />

    <div className='hidden'>
        <SearchBox defaultSearch={defaultSearch} />
    </div>

</UnbxdSearchWrapper >));

stories.add('with click n scroll', () => (<UnbxdSearchWrapper
    siteKey='wildearthclone-neto-com-au808941566310465'
    apiKey='e6959ae0b643d51b565dc3e01bf41ec1'>

    <Products
        pageSize={20}
        paginationType={'CLICK_N_SCROLL'}
        attributesMap={attributesMap} />

    <div className='hidden'>
        <SearchBox defaultSearch={defaultSearch} />
    </div>

</UnbxdSearchWrapper >));

stories.add('with LoadMoreComponent', () => (<UnbxdSearchWrapper
    siteKey='wildearthclone-neto-com-au808941566310465'
    apiKey='e6959ae0b643d51b565dc3e01bf41ec1'>

    <Products
        pageSize={20}
        paginationType={'CLICK_N_SCROLL'}
        LoadMoreComponent={LoadMoreComponent}
        attributesMap={attributesMap} />

    <div className='hidden'>
        <SearchBox defaultSearch={defaultSearch} />
    </div>

</UnbxdSearchWrapper >));

stories.add('with ZeroResultsComponent', () => (<UnbxdSearchWrapper
    siteKey='wildearthclone-neto-com-au808941566310465'
    apiKey='e6959ae0b643d51b565dc3e01bf41ec1'>

    <Products
        attributesMap={attributesMap}
        ZeroResultsComponent={ZeroResultsComponent} />

    <div className='hidden'>
        <SearchBox defaultSearch={defaultSearch} />
    </div>

</UnbxdSearchWrapper >));

stories.add('with view types', () => (<UnbxdSearchWrapper
    siteKey='wildearthclone-neto-com-au808941566310465'
    apiKey='e6959ae0b643d51b565dc3e01bf41ec1'>

    <Products
        productViewTypes={["LIST", "GRID"]}
        attributesMap={attributesMap} />

    <div className='hidden'>
        <SearchBox defaultSearch={defaultSearch} />
    </div>

</UnbxdSearchWrapper >));

stories.add('with view type list', () => (<UnbxdSearchWrapper
    siteKey='wildearthclone-neto-com-au808941566310465'
    apiKey='e6959ae0b643d51b565dc3e01bf41ec1'>

    <Products
        productViewTypes={["LIST", "GRID"]}
        productViewDisplayType={'LIST'}
        ProductsViewItemComponent={ProductsViewItemComponent}
        attributesMap={attributesMap} />

    <div className='hidden'>
        <SearchBox defaultSearch={defaultSearch} />
    </div>

</UnbxdSearchWrapper >));

stories.add('with ProductItemComponent', () => (<UnbxdSearchWrapper
    siteKey='prod-rugsusa808581564092094'
    apiKey='ea4823934059ff8ad5def0be04f8dd4e'>

    <Products
        ProductItemComponent={ProductItemComponent}
        attributesMap={attributesMap}
        showVariants={true}
        variantsCount={4}
        variantAttributesMap={variantAttributesMap}
        showSwatches={true}
        groupBy={'variant_color'}
        swatchAttributes={swatchAttributes} />

    <div className='hidden'>
        <SearchBox defaultSearch={swatchesDefaultSearch} />
    </div>

</UnbxdSearchWrapper >));

stories.add('with showLoader', () => (<UnbxdSearchWrapper
    siteKey='wildearthclone-neto-com-au808941566310465'
    apiKey='e6959ae0b643d51b565dc3e01bf41ec1'>

    <Products
        attributesMap={attributesMap}
        paginationType={'CLICK_N_SCROLL'}
        LoaderComponent={LoaderComponent}
        showLoader={true} />

    <div className='hidden'>
        <SearchBox defaultSearch={defaultSearch} />
    </div>

</UnbxdSearchWrapper >));

stories.add('with callbacks', () => (<UnbxdSearchWrapper
    siteKey='wildearthclone-neto-com-au808941566310465'
    apiKey='e6959ae0b643d51b565dc3e01bf41ec1'>

    <Products
        attributesMap={attributesMap}
        onProductClick={onProductClick}
        onZeroResults={onZeroResults} />

    <div className='hidden'>
        <SearchBox defaultSearch={defaultSearch} />
    </div>

</UnbxdSearchWrapper >));

stories.add('with swatches', () => (<UnbxdSearchWrapper
    siteKey='prod-rugsusa808581564092094'
    apiKey='ea4823934059ff8ad5def0be04f8dd4e'>

    <Products
        attributesMap={attributesMap}
        showVariants={true}
        variantsCount={4}
        variantAttributesMap={variantAttributesMap}
        showSwatches={true}
        groupBy={'variant_color'}
        swatchAttributes={swatchAttributes}
    />

    <div className='hidden'>
        <SearchBox defaultSearch={swatchesDefaultSearch} />
    </div>

</UnbxdSearchWrapper >));

stories.add('with SwatchItemComponent', () => (<UnbxdSearchWrapper
    siteKey='prod-rugsusa808581564092094'
    apiKey='ea4823934059ff8ad5def0be04f8dd4e'>

    <Products
        attributesMap={attributesMap}
        showVariants={true}
        variantsCount={4}
        variantAttributesMap={variantAttributesMap}
        showSwatches={true}
        groupBy={'variant_color'}
        swatchAttributes={swatchAttributes}
        SwatchItemComponent={SwatchItemComponent}
    />

    <div className='hidden'>
        <SearchBox defaultSearch={swatchesDefaultSearch} />
    </div>

</UnbxdSearchWrapper >));

stories.add('with more flexibility', () => (<UnbxdSearchWrapper
    siteKey='wildearthclone-neto-com-au808941566310465'
    apiKey='e6959ae0b643d51b565dc3e01bf41ec1'>

    <Products
        attributesMap={attributesMap} >
        <Products.ViewTypes />
        <Products.ProductsView />
    </Products>

    <div className='hidden'>
        <SearchBox defaultSearch={defaultSearch} />
    </div>

</UnbxdSearchWrapper >));

stories.add('with render props', () => (<UnbxdSearchWrapper
    siteKey='prod-rugsusa808581564092094'
    apiKey='ea4823934059ff8ad5def0be04f8dd4e'>

    <Products
        paginationType={'FIXED_PAGINATION'}
        attributesMap={attributesMap}
        showVariants={true}
        productViewTypes={["GRID", "LIST"]}
        variantsCount={4}
        variantAttributesMap={variantAttributesMap}
    >
        {({ data, helpers }) => {
            //products and viewtypes are passed as parameters
            return (<p>Hello Products</p>)
        }}
    </Products>

    <div className='hidden'>
        <SearchBox defaultSearch={defaultSearch} />
    </div>

</UnbxdSearchWrapper >));