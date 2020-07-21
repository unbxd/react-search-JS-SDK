import React from 'react';
import PropTypes from 'prop-types';

const FacetListItem = ({ itemData, facetName, onClick, priceUnit }) => {
  const { from, to, isSelected = false } = itemData;
  const { name: fromName, count, dataId: fromDataId } = from;
  const { name: ToName, dataId: toDataId } = to;

  return (
    <div
      key={`${facetName}_${fromDataId}-${toDataId}`}
      onClick={onClick}
      data-unx_facetname={`${facetName}_${fromDataId}-${toDataId}`}
      className={`UNX-rangeFacet__item ${isSelected ? '-active' : ''}`}
    >
      {priceUnit} {fromName} - {priceUnit} {ToName} - {count}
    </div>
  );
};

FacetListItem.propTypes = {
  itemData: PropTypes.object.isRequired,
  facetName: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  priceUnit: PropTypes.string.isRequired
};

export default FacetListItem;
