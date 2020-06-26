import { productViewTypes as productViewTypesOptions } from './constants';

const getProductFields = (product, productMap, showVariants, productVariantMap) => {
    const mapper = {
        PRODUCT_NAME: 'productName',
        IMAGE_URL: 'imageUrl',
        PRICE: 'price',
        SELLING_PRICE: 'sellingPrice',
        UNIQUE_ID: 'uniqueId'
    }

    const productValues = {};
    for (let key in mapper) {
        const mappedKey = mapper[key];
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

    return productValues;
}

const getProductViewType = (productViewTypes = []) => {
    const validViewTypes = productViewTypes.filter(viewType => (productViewTypesOptions[viewType]));
    return validViewTypes.length ? validViewTypes : [productViewTypesOptions.GRID];
}

export { getProductFields, getProductViewType };
