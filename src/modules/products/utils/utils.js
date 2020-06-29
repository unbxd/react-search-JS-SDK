import { productViewTypes as productViewTypesOptions } from './constants';

const getProductFields = ({
    itemData: product, productMap,
    showVariants,
    productVariantMap,
    showSwatches,
    swatchAttributes,
    groupBy }) => {

    const productMapper = {
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
    for (let key in productMapper) {
        const mappedKey = productMapper[key];
        if (product['relevantDocument'] === 'variant' && showVariants) {
            if (key === 'IMAGE_URL') {
                const value = product['variants'][0][productVariantMap[mappedKey]];
                productValues[mappedKey] = Array.isArray(value) && value.length ? value[0] : value;
            } else {
                productValues[mappedKey] = product['variants'][0][productVariantMap[mappedKey]];
            }
        } else {
            if (key === 'IMAGE_URL') {
                const value = product[productMap[mappedKey]];
                productValues[mappedKey] = Array.isArray(value) && value.length ? value[0] : value;
            } else {
                productValues[mappedKey] = product[productMap[mappedKey]];
            }

        }

    }


    //we need to iterate variants array
    if (showSwatches) {
        swatches = product['variants'].map((variant, idx) => {
            
            const swatchDetails = {};
            swatchDetails['swatchId'] = variant[productVariantMap[productMapper.UNIQUE_ID]];
            swatchDetails['swatchImageUrl'] = variant[swatchAttributes[productMapper.SWATCH_IMAGE_URL]];
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

const getProductViewType = (productViewTypes = []) => {
    const validViewTypes = productViewTypes.filter(viewType => (productViewTypesOptions[viewType]));
    return validViewTypes.length ? validViewTypes : [productViewTypesOptions.GRID];
}

export { getProductFields, getProductViewType };
