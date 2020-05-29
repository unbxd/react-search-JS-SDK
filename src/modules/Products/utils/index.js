const productFieldsMapper = (product, fieldMap, variantMap) => {
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
        if (product['relevantDocument'] === 'variant' && product['variants'].length > 0) {
            productValues[mappedKey] = product['variants'][0][variantMap[mappedKey]];
        } else {
            productValues[mappedKey] = product[fieldMap[mappedKey]];
        }

    }

    return productValues;
}

export { productFieldsMapper };
