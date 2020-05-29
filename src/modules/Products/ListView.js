import React from 'react';
import PropTypes from 'prop-types';

import { ListProductCard } from './ProductCards';

const ListView = ({ products = [], fieldMap, isVariant, variantMap, unbxdProductCardClickHandler }) => {

    return (<div className={`Unbx-product-container Unbx-grid-view grid grid-cols-1 gap-4 p-4`}>{
        products.map((product) => {
            return (<ListProductCard product={product}
                fieldMap={fieldMap}
                isVariant={isVariant}
                variantMap={variantMap}
                key={product.uniqueId}
                unbxdProductCardClickHandler={unbxdProductCardClickHandler} />)
        })

    }
    </div>)
}
ListView.propTypes = {
    products: PropTypes.arrayOf(PropTypes.object).isRequired,
    per_row: PropTypes.number.isRequired,
    fieldMap: PropTypes.object.isRequired,
    isVariant: PropTypes.bool.isRequired,
    variantMap: PropTypes.object.isRequired,
    unbxdProductCardClickHandler: PropTypes.func.isRequired
}

export default ListView;
