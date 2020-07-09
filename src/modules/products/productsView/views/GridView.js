import React from 'react';
import PropTypes from 'prop-types';

import { GridProductCard } from '../productCards';
import { List } from '../../../../components/index';
//We need the attributesMap object to map to values

const GridView = (props) => {

    const { products = [],
        perRow,
        attributesMap,
        showVariants,
        variantAttributesMap,
        onProductClick,
        ProductItemComponent,
        showSwatches,
        swatchAttributes,
        groupBy,
        SwatchItemComponent,
        productViewType } = props;

    return (<div className='UNX-products__container'>
        <List
            idAttribute={'uniqueId'}
            items={products}
            ListItem={ProductItemComponent || GridProductCard}
            productViewType={productViewType}
            onClick={onProductClick}
            attributesMap={attributesMap}
            showVariants={showVariants}
            variantAttributesMap={variantAttributesMap}
            showSwatches={showSwatches}
            swatchAttributes={swatchAttributes}
            groupBy={groupBy}
            SwatchItemComponent={SwatchItemComponent}
            className={`UNX-products__list -grid grid-cols-${perRow}`} />
    </div>)
}

GridView.propTypes = {
    products: PropTypes.arrayOf(PropTypes.object).isRequired,
    perRow: PropTypes.number.isRequired,
    attributesMap: PropTypes.object.isRequired,
    showVariants: PropTypes.bool.isRequired,
    variantAttributesMap: PropTypes.object.isRequired,
    onProductClick: PropTypes.func.isRequired,
    ProductItemComponent:PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
    showSwatches:PropTypes.bool,
    swatchAttributes:PropTypes.object,
    groupBy:PropTypes.string,
    SwatchItemComponent:PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
    productViewType: PropTypes.string.isRequired,

}

export default GridView;
