export const getProductFields = ({
    product,
    attributesMap,
    showVariants,
    variantAttributesMap,
    showSwatches,
    swatchAttributesMap
}) => {
    const attributesMapper = {
        TITLE: 'title',
        UNIQUE_ID: 'uniqueId',
        PRODUCT_URL: 'productUrl',
        IMAGE_URL: 'imageUrl',
        PRICE: 'price',
        SELLING_PRICE: 'sellingPrice'
    };

    const variantAttributesMapper = {
        TITLE: 'title',
        UNIQUE_ID: 'uniqueId',
        PRODUCT_URL: 'productUrl',
        IMAGE_URL: 'imageUrl',
        PRICE: 'price',
        SELLING_PRICE: 'sellingPrice',
        SWATCH: 'swatchImageUrl',
        COLOR: 'color',
        SIZE: 'size'
    };

    const UNIQUE_ID = attributesMapper['attributesMapper'] || 'uniqueId';

    let productValues = {};
    let variants = [];
    let swatches = [];
    productValues[UNIQUE_ID] = product[UNIQUE_ID];
    for (const key in attributesMapper) {
        let mappedKey = attributesMapper[key];
        if (product['relevantDocument'] === 'variant' && showVariants) {
            mappedKey = variantAttributesMapper[key];
            if (key === 'IMAGE_URL') {
                const value =
                    product['variants'][0][variantAttributesMap[mappedKey]];
                productValues[mappedKey] =
                    Array.isArray(value) && value.length ? value[0] : value;
            } else {
                productValues[mappedKey] =
                    product['variants'][0][variantAttributesMap[mappedKey]];
            }
        } else if (key === 'IMAGE_URL') {
            const value = product[attributesMap[mappedKey]];
            productValues[mappedKey] =
                Array.isArray(value) && value.length ? value[0] : value;
        } else {
            productValues[mappedKey] = product[attributesMap[mappedKey]];
        }
    }

    productValues = { ...product, ...productValues };

    // we need to iterate variants array
    if (showVariants) {
        variants = product['variants'].map((variant) => {
            let variantValues = {};
            variantValues[variantAttributesMapper[UNIQUE_ID]] =
                product[
                    variantAttributesMap[[variantAttributesMapper[UNIQUE_ID]]]
                ];
            for (const key in variantAttributesMapper) {
                const mappedKey = variantAttributesMapper[key];
                if (key === 'IMAGE_URL') {
                    const value = variant[variantAttributesMap[mappedKey]];
                    variantValues[mappedKey] =
                        Array.isArray(value) && value.length ? value[0] : value;
                } else {
                    variantValues[mappedKey] =
                        variant[variantAttributesMap[mappedKey]];
                }
            }
            return { ...variant, ...variantValues };
        });
    }

    // we need to iterate variants array for swatches
    if (showSwatches) {
        swatches = product['variants'].map((variant, idx) => {
            const swatchDetails = {};
            swatchDetails[variantAttributesMapper.UNIQUE_ID] =
                variant[
                    variantAttributesMap[variantAttributesMapper.UNIQUE_ID]
                ];
            swatchDetails[variantAttributesMapper.SWATCH] =
                variant[swatchAttributesMap[variantAttributesMapper.SWATCH]];

            const variantValues = {};
            for (const key in swatchAttributesMap) {
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
    productValues['variants'] = variants;
    return productValues;
};

export const getProductPids = (products, productIdAttribute) => {
    const pids = products.map((product) => {
        return product[productIdAttribute];
    });

    return pids;
};
