import React from 'react';

import { MultilevelFacets } from '@unbxd-ui/react-search-sdk';
import { scrollTop } from '../utils';

const FacetItemComponent = ({ itemData, onClick }) => {
    const { name, count, level, isSelected } = itemData;
    const handleClick = () => {
        onClick(itemData);
    };
    return (
        <div
            className={`UNX-facet__item -l${level} ${
                isSelected ? '-selected' : ''
            }`}
            onClick={handleClick}
        >
            <div className="-checkbox"></div>
            <div className="-label">{name}</div>
            {count && <div className="-count">({count})</div>}
        </div>
    );
};

const onFacetClick = (facet) => {
    console.log('Facet change :', facet);
    scrollTop();
    return true;
};
const label = <div className="UNX-searchFacet__mainHeader">Filter By</div>;
const MultilevelFilters = ({ showLabel = true }) => {
    return (
        <MultilevelFacets
            enableViewMore={true}
            collapsible={true}
            searchable={true}
            facetItemComponent={<FacetItemComponent />}
            label={showLabel ? label : undefined}
            minViewMore={3}
            onFacetClick={onFacetClick}
        />
    );
};

export default MultilevelFilters;
