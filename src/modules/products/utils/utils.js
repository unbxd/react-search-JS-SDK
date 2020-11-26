export const getProductFields = ({
    itemData: product,
    attributesMap,
    showVariants,
    variantAttributesMap,
    showSwatches,
    swatchAttributesMap,
    groupBy
}) => {
    const attributesMapper = {
        PRODUCT_NAME: 'productName',
        PRODUCT_URL: 'productUrl',
        IMAGE_URL: 'imageUrl',
        SWATCH_IMAGE_URL: 'swatchImageUrl',
        PRICE: 'price',
        SELLING_PRICE: 'sellingPrice',
        UNIQUE_ID: 'uniqueId'
    };

    const productValues = {};
    let swatches = [];
    for (let key in attributesMapper) {
        const mappedKey = attributesMapper[key];
        if (product['relevantDocument'] === 'variant' && showVariants) {
            if (key === 'IMAGE_URL') {
                const value =
                    product['variants'][0][variantAttributesMap[mappedKey]];
                productValues[mappedKey] =
                    Array.isArray(value) && value.length ? value[0] : value;
            } else {
                productValues[mappedKey] =
                    product['variants'][0][variantAttributesMap[mappedKey]];
            }
        } else {
            if (key === 'IMAGE_URL') {
                const value = product[attributesMap[mappedKey]];
                productValues[mappedKey] =
                    Array.isArray(value) && value.length ? value[0] : value;
            } else {
                productValues[mappedKey] = product[attributesMap[mappedKey]];
            }
        }
    }

    //we need to iterate variants array
    if (showSwatches) {
        swatches = product['variants'].map((variant, idx) => {
            const swatchDetails = {};
            swatchDetails['swatchId'] =
                variant[variantAttributesMap[attributesMapper.UNIQUE_ID]];
            swatchDetails['swatchImageUrl'] =
                variant[swatchAttributesMap[attributesMapper.SWATCH_IMAGE_URL]];
            swatchDetails['groupByValue'] = variant[groupBy];

            const variantValues = {};
            for (let key in swatchAttributesMap) {
                const mappedKey = swatchAttributesMap[key];

                if (key === 'imageUrl') {
                    const value = variant[mappedKey];
                    variantValues[key] =
                        Array.isArray(value) && value.length ? value[0] : value;
                } else {
                    variantValues[key] = variant[mappedKey];
                }
            }

            const swatchItem = { ...swatchDetails, ...variantValues };

            if (idx === 0) {
                swatchItem['isSelected'] = true;
            }
            return swatchItem;
        });
    }

    productValues['swatches'] = swatches;
    return productValues;
};

export const getProductPids = (products, productIdAttribute) => {
    const pids = products.map((product) => {
        return product[productIdAttribute];
    });

    return pids;
};
