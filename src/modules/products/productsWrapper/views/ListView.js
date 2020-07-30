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
    ProductItemComponent,
    showSwatches,
    swatchAttributesMap,
    groupBy,
    SwatchItemComponent,
    viewType,
    priceUnit
  } = props;

  return (
    <div className="UNX-products__container">
      {
        <List
          idAttribute={'uniqueId'}
          items={products}
          ListItem={ProductItemComponent || ListProductCard}
          viewType={viewType}
          onClick={onProductClick}
          attributesMap={attributesMap}
          showVariants={showVariants}
          variantAttributesMap={variantAttributesMap}
          showSwatches={showSwatches}
          swatchAttributesMap={swatchAttributesMap}
          groupBy={groupBy}
          SwatchItemComponent={SwatchItemComponent}
          className="UNX-products__list -list grid-cols-1"
          priceUnit={priceUnit}
        />
      }
    </div>
  );
};
ListView.propTypes = {
  products: PropTypes.arrayOf(PropTypes.object).isRequired,
  attributesMap: PropTypes.object.isRequired,
  showVariants: PropTypes.bool.isRequired,
  variantAttributesMap: PropTypes.object.isRequired,
  onProductClick: PropTypes.func.isRequired,
  ProductItemComponent: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.func
  ]),
  showSwatches: PropTypes.bool,
  swatchAttributesMap: PropTypes.object,
  groupBy: PropTypes.string,
  SwatchItemComponent: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
  viewType: PropTypes.string.isRequired,
  priceUnit: PropTypes.string.isRequired
};

export default ListView;
