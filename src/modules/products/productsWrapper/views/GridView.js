import React from 'react';
import PropTypes from 'prop-types';

import { GridProductCard } from '../productCards';
import { List } from '../../../../components/index';

const GridView = (props) => {
    const {
        products = [],
        perRow,
        attributesMap,
        showVariants,
        variantAttributesMap,
        onProductClick,
        productItemComponent,
        showSwatches,
        swatchAttributesMap,
        groupBy,
        swatchItemComponent,
        viewType,
        priceUnit
    } = props;

    return (
        <div className="UNX-products__container">
            <List
                idAttribute="uniqueId"
                items={products}
                ListItem={productItemComponent || GridProductCard}
                viewType={viewType}
                onClick={onProductClick}
                attributesMap={attributesMap}
                showVariants={showVariants}
                variantAttributesMap={variantAttributesMap}
                showSwatches={showSwatches}
                swatchAttributesMap={swatchAttributesMap}
                groupBy={groupBy}
                swatchItemComponent={swatchItemComponent}
                className={`UNX-products__list -grid grid-cols-${perRow}`}
                priceUnit={priceUnit}
            />
        </div>
    );
};

GridView.propTypes = {
    products: PropTypes.arrayOf(PropTypes.object).isRequired,
    perRow: PropTypes.number.isRequired,
    attributesMap: PropTypes.object.isRequired,
    showVariants: PropTypes.bool.isRequired,
    variantAttributesMap: PropTypes.object.isRequired,
    onProductClick: PropTypes.func.isRequired,
    productItemComponent: PropTypes.element,
    showSwatches: PropTypes.bool,
    swatchAttributesMap: PropTypes.object,
    groupBy: PropTypes.string,
    swatchItemComponent: PropTypes.element,
    viewType: PropTypes.string.isRequired,
    priceUnit: PropTypes.string.isRequired
};

export default GridView;
