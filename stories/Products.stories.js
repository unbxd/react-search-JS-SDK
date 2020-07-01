import React from 'react';
import { storiesOf } from '@storybook/react';

import UnbxdSearchWrapper from '../src/UnbxdSearchWrapper';
import { Products } from '../src/modules/products/Products';

const stories = storiesOf('Products', module).addParameters({
    props: {
        propTablesExclude: [UnbxdSearchWrapper,
            'ProductViews',
            'ViewTypes']
    }
});

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
        const { idAttribute, idx, showSwatches } = this.props;

        const [activeSwatch] = productValues['swatchValues'].filter((swatch) => {
            return swatch.active
        });

        const product = { ...productValues, ...activeSwatch };
        const { imageUrl, title, productUrl, swatchValues } = product;
        const uniqueId = idAttribute;
        const prank = idx + 1;

        return (<div className='myproduct'>
            <div className='myproduct-details' data-uniqueid={uniqueId} data-prank={prank}>
                <a href={productUrl} className={`myproduct-card`} data-uniqueid={uniqueId} data-prank={prank}>
                    <img className='myproduct-card image' src={imageUrl} data-uniqueid={uniqueId} data-prank={prank} />
                    <p className='myproduct-card name' data-uniqueid={uniqueId} data-prank={prank}>{title}</p>
                </a>
            </div>
            {showSwatches && <div className='myproduct-swatches'>
                {swatchValues.map(swatch => {
                    const { swatchImageUrl, swatchId } = swatch;
                    return (<img className='myproduct-swatch image' src={swatchImageUrl} data-swatchid={swatchId} onClick={this.handleSwatchClick} />)
                })}
            </div>}
        </div>)
    }
}

const ProductsViewItemComponent = ({ itemData, isActive }) => {
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

const productAttributes = {
    productName: "title",
    uniqueId: "uniqueId",
    imageUrl: "imageUrl",
    price: "min_cheapest_default_price",
    productUrl: "productUrl"
}

const variantAttributes = {
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
    productUrl: "variant_productUrl",
};

const SwatchItemComponent = ({ itemData }) => {
    const { swatchImageUrl, swatchId, active } = itemData;
    return (<div
        className={`my-swatch ${active ? 'active' : ''}`}
        data-variant_id={swatchId}
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
        productAttributes={productAttributes} />

</UnbxdSearchWrapper >));

stories.add('with perRow', () => (<UnbxdSearchWrapper
    siteKey='wildearthclone-neto-com-au808941566310465'
    apiKey='e6959ae0b643d51b565dc3e01bf41ec1'>

    <Products
        perRow={3}
        productAttributes={productAttributes} />

</UnbxdSearchWrapper >));

stories.add('with pageSize', () => (<UnbxdSearchWrapper
    siteKey='wildearthclone-neto-com-au808941566310465'
    apiKey='e6959ae0b643d51b565dc3e01bf41ec1'>

    <Products
        pageSize={20}
        paginationType={'INFINITE_SCROLL'}
        productAttributes={productAttributes} />

</UnbxdSearchWrapper >));

stories.add('with showVariants', () => (<UnbxdSearchWrapper
    siteKey='wildearthclone-neto-com-au808941566310465'
    apiKey='e6959ae0b643d51b565dc3e01bf41ec1'>

    <Products
        showVariants={true}
        productAttributes={productAttributes}
        variantAttributes={variantAttributes} />

</UnbxdSearchWrapper >));

stories.add('with variantsCount', () => (<UnbxdSearchWrapper
    siteKey='wildearthclone-neto-com-au808941566310465'
    apiKey='e6959ae0b643d51b565dc3e01bf41ec1'>

    <Products
        showVariants={true}
        variantsCount={2}
        productAttributes={productAttributes}
        variantAttributes={variantAttributes} />

</UnbxdSearchWrapper >));

stories.add('with infinite scroll', () => (<UnbxdSearchWrapper
    siteKey='wildearthclone-neto-com-au808941566310465'
    apiKey='e6959ae0b643d51b565dc3e01bf41ec1'>

    <Products
        pageSize={20}
        paginationType={'INFINITE_SCROLL'}
        heightDiffToTriggerNextPage={200}
        productAttributes={productAttributes} />

</UnbxdSearchWrapper >));

stories.add('with click n scroll', () => (<UnbxdSearchWrapper
    siteKey='wildearthclone-neto-com-au808941566310465'
    apiKey='e6959ae0b643d51b565dc3e01bf41ec1'>

    <Products
        pageSize={20}
        paginationType={'CLICK_N_SCROLL'}
        productAttributes={productAttributes} />

</UnbxdSearchWrapper >));

stories.add('with LoadMoreComponent', () => (<UnbxdSearchWrapper
    siteKey='wildearthclone-neto-com-au808941566310465'
    apiKey='e6959ae0b643d51b565dc3e01bf41ec1'>

    <Products
        pageSize={20}
        paginationType={'CLICK_N_SCROLL'}
        LoadMoreComponent={LoadMoreComponent}
        productAttributes={productAttributes} />

</UnbxdSearchWrapper >));

stories.add('with ZeroResultsComponent', () => (<UnbxdSearchWrapper
    siteKey='wildearthclone-neto-com-au808941566310465'
    apiKey='e6959ae0b643d51b565dc3e01bf41ec1'>

    <Products
        productAttributes={productAttributes}
        ZeroResultsComponent={ZeroResultsComponent} />

</UnbxdSearchWrapper >));

stories.add('with view types', () => (<UnbxdSearchWrapper
    siteKey='wildearthclone-neto-com-au808941566310465'
    apiKey='e6959ae0b643d51b565dc3e01bf41ec1'>

    <Products
        productViewTypes={["LIST", "GRID"]}
        productAttributes={productAttributes} />

</UnbxdSearchWrapper >));

stories.add('with view type list', () => (<UnbxdSearchWrapper
    siteKey='wildearthclone-neto-com-au808941566310465'
    apiKey='e6959ae0b643d51b565dc3e01bf41ec1'>

    <Products
        productViewTypes={["LIST", "GRID"]}
        productViewDisplayType={'LIST'}
        ProductsViewItemComponent={ProductsViewItemComponent}
        productAttributes={productAttributes} />

</UnbxdSearchWrapper >));

stories.add('with ProductItemComponent', () => (<UnbxdSearchWrapper
    siteKey='prod-rugsusa808581564092094'
    apiKey='ea4823934059ff8ad5def0be04f8dd4e'>

    <Products
        ProductItemComponent={ProductItemComponent}
        productAttributes={productAttributes}
        showVariants={true}
        variantsCount={4}
        variantAttributes={variantAttributes}
        showSwatches={true}
        groupBy={'variant_color'}
        swatchAttributes={swatchAttributes} />

</UnbxdSearchWrapper >));

stories.add('with showLoader', () => (<UnbxdSearchWrapper
    siteKey='wildearthclone-neto-com-au808941566310465'
    apiKey='e6959ae0b643d51b565dc3e01bf41ec1'>

    <Products
        productAttributes={productAttributes}
        paginationType={'CLICK_N_SCROLL'}
        LoaderComponent={LoaderComponent}
        showLoader={true} />

</UnbxdSearchWrapper >));

stories.add('with callbacks', () => (<UnbxdSearchWrapper
    siteKey='wildearthclone-neto-com-au808941566310465'
    apiKey='e6959ae0b643d51b565dc3e01bf41ec1'>

    <Products
        productAttributes={productAttributes}
        onProductClick={onProductClick}
        onZeroResults={onZeroResults} />

</UnbxdSearchWrapper >));

stories.add('with swatches', () => (<UnbxdSearchWrapper
    siteKey='prod-rugsusa808581564092094'
    apiKey='ea4823934059ff8ad5def0be04f8dd4e'>

    <Products
        productAttributes={productAttributes}
        showVariants={true}
        variantsCount={4}
        variantAttributes={variantAttributes}
        showSwatches={true}
        groupBy={'variant_color'}
        swatchAttributes={swatchAttributes}
    />

</UnbxdSearchWrapper >));

stories.add('with SwatchItemComponent', () => (<UnbxdSearchWrapper
    siteKey='prod-rugsusa808581564092094'
    apiKey='ea4823934059ff8ad5def0be04f8dd4e'>

    <Products
        productAttributes={productAttributes}
        showVariants={true}
        variantsCount={4}
        variantAttributes={variantAttributes}
        showSwatches={true}
        groupBy={'variant_color'}
        swatchAttributes={swatchAttributes}
        SwatchItemComponent={SwatchItemComponent}
    />

</UnbxdSearchWrapper >));

stories.add('with more flexibility', () => (<UnbxdSearchWrapper
    siteKey='wildearthclone-neto-com-au808941566310465'
    apiKey='e6959ae0b643d51b565dc3e01bf41ec1'>

    <Products
        productAttributes={productAttributes} >
        <Products.ViewTypes />
        <Products.ProductsView />
    </Products>

</UnbxdSearchWrapper >));

stories.add('with render props', () => (<UnbxdSearchWrapper
    siteKey='prod-rugsusa808581564092094'
    apiKey='ea4823934059ff8ad5def0be04f8dd4e'>

    <Products
        paginationType={'FIXED_PAGINATION'}
        productAttributes={productAttributes}
        showVariants={true}
        productViewTypes={["GRID", "LIST"]}
        variantsCount={4}
        variantAttributes={variantAttributes}
    >
        {({ data, helpers }) => {
            //products and viewtypes are passed as parameters
            return (<p>Hello Products</p>)
        }}
    </Products>

</UnbxdSearchWrapper >));