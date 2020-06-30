import { productViewTypes as productViewTypeOptions } from './constants';

export const getProductFields = ({
    itemData: product, productAttributes,
    showVariants,
    variantAttributes,
    showSwatches,
    swatchAttributes,
    groupBy }) => {

    const productAttributesMapper = {
        PRODUCT_NAME: 'productName',
        PRODUCT_URL: 'productUrl',
        IMAGE_URL: 'imageUrl',
        SWATCH_IMAGE_URL: 'swatchImageUrl',
        PRICE: 'price',
        SELLING_PRICE: 'sellingPrice',
        UNIQUE_ID: 'uniqueId'
    }

    const productValues = {};
    let swatches = [];
    for (let key in productAttributesMapper) {
        const mappedKey = productAttributesMapper[key];
        if (product['relevantDocument'] === 'variant' && showVariants) {
            if (key === 'IMAGE_URL') {
                const value = product['variants'][0][variantAttributes[mappedKey]];
                productValues[mappedKey] = Array.isArray(value) && value.length ? value[0] : value;
            } else {
                productValues[mappedKey] = product['variants'][0][variantAttributes[mappedKey]];
            }
        } else {
            if (key === 'IMAGE_URL') {
                const value = product[productAttributes[mappedKey]];
                productValues[mappedKey] = Array.isArray(value) && value.length ? value[0] : value;
            } else {
                productValues[mappedKey] = product[productAttributes[mappedKey]];
            }

        }

    }


    //we need to iterate variants array
    if (showSwatches) {
        swatches = product['variants'].map((variant, idx) => {

            const swatchDetails = {};
            swatchDetails['swatchId'] = variant[variantAttributes[productAttributesMapper.UNIQUE_ID]];
            swatchDetails['swatchImageUrl'] = variant[swatchAttributes[productAttributesMapper.SWATCH_IMAGE_URL]];
            swatchDetails['groupByValue'] = variant[groupBy];


            const variantValues = {};
            for (let key in swatchAttributes) {
                const mappedKey = swatchAttributes[key];

                if (key === 'imageUrl') {
                    const value = variant[mappedKey];
                    variantValues[key] = Array.isArray(value) && value.length ? value[0] : value;
                } else {
                    variantValues[key] = variant[mappedKey];
                }

            }

            const swatchItem = { ...swatchDetails, ...variantValues };

            if (idx === 0) {
                swatchItem['active'] = true;
            }
            return swatchItem;
        })
    }


    productValues['swatches'] = swatches;
    return productValues;
}

export const getProductViewType = (productViewTypes = []) => {
    const validViewTypes = productViewTypes.filter(viewType => (productViewTypeOptions[viewType]));
    return validViewTypes.length ? validViewTypes : [productViewTypeOptions.GRID];
}

export const getProductPids = (products, productIdAttribute) => {
    
    const pids = products.map((product) => {
        return product[productIdAttribute]
    })

    return pids;
}
