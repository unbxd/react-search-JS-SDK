import React from 'react';

import  { CombinedFacets } from '@unbxd-ui/react-search-sdk';

const sortCombinedFacets = function(){
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

const FacetListItemComponent = ({
  itemData,
  facetName,
  onClick,
  priceUnit
}) => {
  const { from, to, isSelected = false } = itemData;
  const { name: fromName, count, dataId: fromDataId } = from;
  const { name: ToName, dataId: toDataId } = to;

  return (
    <div
      className={`UNX-facet__item ${isSelected ? 'selected' : ''}`}
      data-unx_facetname={`${facetName}_${fromDataId}-${toDataId}`}
      onClick={onClick}
      key={`${facetName}_${fromDataId}-${toDataId}`}
    >
      <div
        className="-checkbox"
        data-unx_facetname={`${facetName}_${fromDataId}-${toDataId}`}
      />
      <div
        className="-label"
        data-unx_facetname={`${facetName}_${fromDataId}-${toDataId}`}
      >
        {priceUnit}
        {fromName} - {priceUnit}
        {ToName}
      </div>
      <div
        className="-count"
        data-unx_facetname={`${facetName}_${fromDataId}-${toDataId}`}
      >
        ({count})
      </div>
    </div>
  );
};

const CombinedFilters = () => {
    return (
      <CombinedFacets
        sortCombinedFacets = {sortCombinedFacets}
        FacetListItemComponent={FacetListItemComponent}
        FacetItemComponent={FacetItemComponent}
      />
    );
};

export default CombinedFilters;

