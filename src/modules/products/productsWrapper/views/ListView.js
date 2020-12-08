import React from 'react';
import PropTypes from 'prop-types';

import { ListProductCard } from '../productCards';
import { List } from '../../../../components/index';

const ListView = (props) => {
    const {
        products = [],
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
                ListItem={productItemComponent || ListProductCard}
                viewType={viewType}
                onClick={onProductClick}
                attributesMap={attributesMap}
                showVariants={showVariants}
                variantAttributesMap={variantAttributesMap}
                showSwatches={showSwatches}
                swatchAttributesMap={swatchAttributesMap}
                groupBy={groupBy}
                swatchItemComponent={swatchItemComponent}
                className="UNX-products__list -list grid-cols-1"
                priceUnit={priceUnit}
            />
        </div>
    );
};
ListView.propTypes = {
    products: PropTypes.arrayOf(PropTypes.object).isRequired,
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

export default ListView;
