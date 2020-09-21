import React from 'react';

import { SelectedFacets } from '@unbxd-ui/react-search-sdk';

const FacetItemComponent = ({ itemData, onClick,priceUnit }) => {
    const { name, dataId,facetName,filterField='', level=0 } = itemData;

    let facetText = name;
    if (name.indexOf(' TO ') > -1) {
      const [valMin, valMax] = name.split(' TO ');
      facetText = `${priceUnit}${valMin} - ${priceUnit}${valMax}`;
    }

    return (
      <div className='UNX-selectedFacets__item'
        data-unx_name={facetName}
        data-unx_dataid={dataId||name}
        data-unx_categoryname={name}
        data-unx_multilevelfield={filterField}
        data-unx_level={level}
         onClick={onClick}>
        {facetText} <span className='-cross' 
          data-unx_name={facetName}
         data-unx_dataid={dataId}
         data-unx_categoryname={name}
        data-unx_multilevelfield={filterField}
        data-unx_level={level}></span>
      </div>
    );
  };

const label = <div className='-label'>Selected Filters</div>;

const ActiveFilters = () => {
    return (<SelectedFacets FacetItemComponent={FacetItemComponent} label={label}/>)
}

export default ActiveFilters;
