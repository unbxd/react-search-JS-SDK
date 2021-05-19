export const getProductFields = ({
    product,
    attributesMap,
    showVariants,
    variantAttributesMap,
    showSwatches,
    swatchAttributesMap
}) => {
    const UNIQUE_ID = 'uniqueId';

    const parentUniqueIdKey = attributesMap[UNIQUE_ID] || 'uniqueId';

    let productValues = {};
    let variants = [];
    let swatches = [];
    productValues[UNIQUE_ID] = product[parentUniqueIdKey];
    for (const key of Object.keys(attributesMap)) {
        if (product['relevantDocument'] === 'variant' && showVariants) {
            if (key === 'imageUrl') {
                const value = product['variants'][0][key];
                productValues[key] =
                    Array.isArray(value) && value.length ? value[0] : value;
            } else {
                productValues[key] = product['variants'][0][key];
            }
        } else if (key === 'imageUrl') {
            const value = product[attributesMap[key]];
            productValues[key] =
                Array.isArray(value) && value.length ? value[0] : value;
        } else {
            productValues[key] = product[attributesMap[key]];
        }
    }

    productValues = { ...product, ...productValues };

    // we need to iterate variants array
    if (showVariants) {
        const variantUniqueIdKey =
            variantAttributesMap[UNIQUE_ID] || 'uniqueId';
        variants = product['variants'].map((variant) => {
            let variantValues = {};
            variantValues[UNIQUE_ID] = variant[variantUniqueIdKey];
            for (const key of Object.keys(variantAttributesMap)) {
                if (key === 'imageUrl') {
                    const value = variant[variantAttributesMap[key]];
                    variantValues[key] =
                        Array.isArray(value) && value.length ? value[0] : value;
                } else {
                    variantValues[key] = variant[variantAttributesMap[key]];
                }
            }
            return { ...variant, ...variantValues };
        });
    }

    // we need to iterate variants array for swatches
    if (showSwatches) {
        swatches = product['variants'].map((variant, idx) => {
            const swatchDetails = {};
            const variantUniqueIdKey =
                variantAttributesMap[UNIQUE_ID] || 'uniqueId';
            swatchDetails[UNIQUE_ID] = variant[variantUniqueIdKey];
            swatchDetails['swatchImageUrl'] =
                variant[swatchAttributesMap['swatchImageUrl']];

            const variantValues = {};
            for (const key of Object.keys(swatchAttributesMap)) {
                if (key === 'imageUrl') {
                    const value = variant[swatchAttributesMap[key]];
                    variantValues[key] =
                        Array.isArray(value) && value.length ? value[0] : value;
                } else {
                    variantValues[key] = variant[swatchAttributesMap[key]];
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
    productValues['variants'] = variants;
    return productValues;
};

export const getProductPids = (products, productIdAttribute) => {
    const pids = products.map((product) => {
        return product[productIdAttribute];
    });

    return pids;
};
