import React from 'react';

import { RangeFacets } from '@unbxd-ui/react-search-sdk';
import { scrollTop } from '../utils';

const transform = function () {
    console.log(this);
    return this;
};

export const FacetItemComponent = ({ itemData, onClick, priceUnit }) => {
    const { from, end, facetName, isSelected = false } = itemData;
    const { name: fromName, count, dataId: fromDataId } = from;
    const { name: ToName, dataId: toDataId } = end;

    const handleClick = () => {
        onClick(itemData);
    };

    return (
        <div
            key={`${facetName}_${fromDataId}-${toDataId}`}
            className={`UNX-facet__item ${isSelected ? '-selected' : ''}`}
            onClick={handleClick}
        >
            <div className="-checkbox" />
            <div className="-label">
                {priceUnit}
                {fromName} - {priceUnit}
                {ToName}
            </div>
            <div className="-count">({count})</div>
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
            transform={transform}
            FacetItemComponent={FacetItemComponent}
            collapsible={true}
            enableViewMore={true}
            minViewMore={3}
            //onFacetClick={onFacetClick}
        />
    );
};

export default RangeFilters;
