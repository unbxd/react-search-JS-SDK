import React from 'react';
import PropTypes from 'prop-types';

const FacetItem = ({ itemData, onClick, priceUnit }) => {
  const { name, facetName, dataId, filterField='', level=0 } = itemData;
  let selectedFacetMarkup = (
    <span data-unx_name={facetName} data-unx_dataid={dataId}>
      {name} x
    </span>
  );
  if (name.indexOf(' TO ') > -1) {
    const [valMin, valMax] = name.split(' TO ');
    selectedFacetMarkup = (
      <span data-unx_name={facetName} data-unx_dataid={dataId}>
        {priceUnit} {valMin} - {priceUnit} {valMax} x
      </span>
    );
  }
  if(filterField.length && level>0){

    selectedFacetMarkup = (
      <span data-unx_categoryname={name}
        data-unx_multilevelfield={filterField}
        data-unx_level={level}>
        {name}
      </span>
    );
  }

  return (
    <div className='UNX-selectedFacets__item' 
      data-unx_name={facetName}
      data-unx_dataid={dataId}
      data-unx_categoryname={name}
      data-unx_multilevelfield={filterField}
      data-unx_level={level}
      onClick={onClick}>
      {selectedFacetMarkup}
    </div>
  );
};

FacetItem.propTypes = {
  itemData: PropTypes.object,
  onClick: PropTypes.func.isRequired,
  priceUnit: PropTypes.string
};

export default FacetItem;
