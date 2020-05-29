import React from 'react';
import PropTypes from 'prop-types';

import { GridProductCard } from './ProductCards';
//We need the fieldMap object to map to values

const GridView = (props) => {

    const { products = [],
        per_row,
        fieldMap,
        variantMap,
        unbxdProductCardClickHandler } = props;

    return (<div className={`Unbx-product-container Unbx-grid-view grid grid-cols-${per_row} gap-4 p-4`}>{
        products.map((product) => {
            return (<GridProductCard product={product}
                fieldMap={fieldMap}
                variantMap={variantMap}
                per_row={per_row}
                key={product.uniqueId}
                unbxdProductCardClickHandler={unbxdProductCardClickHandler} />)
        })

    }
    </div>)
}

GridView.propTypes = {
    products: PropTypes.arrayOf(PropTypes.object).isRequired,
    per_row: PropTypes.number.isRequired,
    fieldMap: PropTypes.object.isRequired,
    variantMap: PropTypes.object.isRequired,
    unbxdProductCardClickHandler: PropTypes.func.isRequired
}

export default GridView;
