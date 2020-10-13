import React from 'react';

import { RangeFacets } from '@unbxd-ui/react-search-sdk';
import { scrollTop } from '../utils';

const sortRangeFacets = function () {
    console.log(this);
    return this;
};

const FacetListItemComponent = ({
    itemData,
    facetName,
    onClick,
    priceUnit,
}) => {
    const { from, end, isSelected = false } = itemData;
    const { name: fromName, count, dataId: fromDataId } = from;
    const { name: ToName, dataId: toDataId } = end;

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

const onFacetClick = (facet, isSelected) => {
    console.log('Facet change :', facet, isSelected);
    scrollTop();
    return true;
};

const RangeFilters = () => {
    return (
        <RangeFacets
            sortRangeFacets={sortRangeFacets}
            FacetListItemComponent={FacetListItemComponent}
            collapsible={true}
            enableViewMore={true}
            //onFacetClick={onFacetClick}
        />
    );
};

export default RangeFilters;
