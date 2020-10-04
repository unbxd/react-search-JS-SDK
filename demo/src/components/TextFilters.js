import React from 'react';

import { TextFacets } from '@unbxd-ui/react-search-sdk';

const sortTextFacets = function(){
  console.log(this);
};

const FacetItemComponent = ({
  itemData,
  facetName,
  onClick,
  isFacetSelected,
  selectedFacets
}) => {
  const { name, count, dataId } = itemData;
  const isSelected = isFacetSelected(selectedFacets, facetName, dataId);

  return (
    <div
      className={`UNX-facet__item ${isSelected ? 'selected' : ''}`}
      data-unx_name={facetName}
      data-unx_dataid={dataId}
      onClick={onClick}
    >
      <div
        className="-checkbox"
        data-unx_name={facetName}
        data-unx_dataid={dataId}
      ></div>
      <div
        className="-label"
        data-unx_name={facetName}
        data-unx_dataid={dataId}
      >
        {name}
      </div>
      <div
        className="-count"
        data-unx_name={facetName}
        data-unx_dataid={dataId}
      >
        ({count})
      </div>
    </div>
  );
};

const TextFilters = () => {
  return (
    <TextFacets
      FacetItemComponent={FacetItemComponent}
      collapsible={true}
      searchable={true}
      sortTextFacets={sortTextFacets}
    />
  );
};

export default TextFilters;
